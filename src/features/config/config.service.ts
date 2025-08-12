import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './config';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { IConfigDto } from './config.dto';

type PageMeta =
  | { page: number; limit: number; total: number; totalPages: number }
  | { page: null; limit: null; total: number; totalPages: 1 };

function coercePositiveInt(v: unknown, { min = 1, max }: { min?: number; max?: number } = {}) {
  if (v === undefined || v === null || v === '') return undefined;
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return undefined;
  const i = Math.trunc(n);
  if (i < min) return undefined;
  if (max !== undefined && i > max) return max;
  return i;
}

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {
  }

  async getAllConfig(
    page?: number | string,
    limit?: number | string,
  ): Promise<{ data: Config[] } & PageMeta> {
    // ---- normalize inputs ----
    const parsedPage = coercePositiveInt(page);
    const parsedLimit = coercePositiveInt(limit);

    // sensible defaults only when at least one value provided
    const hasPage = parsedPage !== undefined;
    const hasLimit = parsedLimit !== undefined;

    const normalizedLimit = hasLimit ? parsedLimit! : undefined;
    const normalizedPage = hasPage ? parsedPage! : hasLimit ? 1 : undefined;

    // ---- base query ----
    const qb = this.configRepository
      .createQueryBuilder('config')
      .leftJoinAndSelect('config.configType', 'configType')
      .select([
        'config.id',
        'config.desc',
        'config.dateFrom',
        'config.dateTo',
        'config.status',
        'configType.id',
        'configType.name',
      ])
      .orderBy('config.id', 'ASC'); // why: stable pagination

    // ---- paginated branch ----
    if (normalizedPage !== undefined && normalizedLimit !== undefined) {
      const offset = (normalizedPage - 1) * normalizedLimit;

      // TypeORM cross-db (use skip/take instead of offset/limit)
      const [data, total] = await qb
        .skip(offset)
        .take(normalizedLimit)
        .getManyAndCount();

      return {
        data,
        total,
        page: normalizedPage,
        limit: normalizedLimit,
        totalPages: Math.max(1, Math.ceil(total / Math.max(1, normalizedLimit))),
      };
    }

    // ---- no pagination: return all ----
    const [data, total] = await qb.getManyAndCount();
    return { data, total, page: null, limit: null, totalPages: 1 };
  }

  createConfig(createConfig: IConfigDto) {
    const fromDate = new Date(
      createConfig.dateFrom.toString().split('/').reverse().join('-'),
    );

    const toDate = new Date(
      createConfig.dateTo.toString().split('/').reverse().join('-'),
    );

    const config = this.configRepository.create({
      desc: createConfig.desc ?? '',
      dateFrom: fromDate,
      dateTo: toDate,
      status: createConfig.status,
      configTypeId: createConfig.configTypeId,
      id: uuidV4(),
    });
    return this.configRepository.save(config);
  }

  async updateConfig(id: string, updateConfig: IConfigDto) {
    return await this.configRepository.update(id, updateConfig);
  }

  async deleteConfig(id: string) {
    await this.findOne(id);
    await this.configRepository.delete(id);
    return 'delete ok !';
  }

  async findOne(id: string) {
    const findOne = await this.configRepository.findOneBy({
      id: id,
    });

    if (!findOne) {
      throw new NotFoundException(`khong tim thay config ${ id }`);
    }
    return findOne;
  }
}
