import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConfigType } from './config-type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConfigTypeService {
  constructor(
    @InjectRepository(ConfigType)
    private readonly configTypeRepository: Repository<ConfigType>,
  ) {}

  private readonly logger = new Logger(ConfigTypeService.name);
  async mock1mRecord(total = 1_000_000, chunkSize = 5_000): Promise<number> {
    if (chunkSize <= 0) throw new Error('chunkSize must be > 0');
    if (total <= 0) return 0;

    // Ensure params per batch remain safe: columns * chunkSize < ~65k
    const columnsPerRow = 2; // id, name
    const estimatedParams = columnsPerRow * chunkSize;
    if (estimatedParams >= 60_000) {
      throw new Error(
        `chunkSize too large for Postgres parameter limit. Try <= ${Math.floor(60_000 / columnsPerRow)}.`,
      );
    }

    let inserted = 0;
    const started = Date.now();

    for (let offset = 0; offset < total; offset += chunkSize) {
      const currentSize = Math.min(chunkSize, total - offset);

      // Build plain values (no entity instances) for faster raw insert
      const batch: Array<Pick<ConfigType, 'id' | 'name'>> = new Array(
        currentSize,
      );
      for (let i = 0; i < currentSize; i++) {
        const n = offset + i;
        batch[i] = {
          id: uuidv4(),
          name: `config_type_${n}`,
        };
      }

      // Use repository.insert for bulk insert without entity lifecycle cost
      await this.configTypeRepository.insert(batch);

      inserted += currentSize;

      // Minimal progress logging; helps track long runs
      if (inserted % (chunkSize * 10) === 0 || inserted === total) {
        const elapsedMs = Date.now() - started;
        this.logger.log(
          `Inserted ${inserted}/${total} rows in ${Math.round(elapsedMs / 1000)}s`,
        );
      }
    }

    return inserted;
  }

  async deleteConfigTypesByIdsPg(ids: string[]) {
    const result = await this.configTypeRepository.delete({ id: In(ids) });
    return { affected: result.affected ?? 0 };
  }

  async mock1mRecordSql(total = 1_000_000): Promise<number> {
    if (total <= 0) return 0;

    // Pick the UUID function you have installed; prefer gen_random_uuid()
    const uuidFn = 'gen_random_uuid()'; // or 'uuid_generate_v4()'

    // NOTE: This uses a single SQL statement; Postgres handles the generation server-side.
    // It avoids parameter limits entirely and is very fast.
    const tableName = this.configTypeRepository.metadata.tablePath; // respects schema if set

    await this.configTypeRepository.query(
      `INSERT INTO ${tableName} (id, name)
       SELECT ${uuidFn}, CONCAT('config_type_', gs.i)
       FROM generate_series(1, $1) AS gs(i);`,
      [total],
    );

    return total;
  }

  async createConfigType(name: string) {
    const configType = this.configTypeRepository.create({
      name: name,
      id: uuidv4(),
    });
    console.log(configType);
    return this.configTypeRepository.save(configType);
  }

  async createMany() {
    return Promise.resolve();
  }

  async deleteConfigType(id: string) {
    await this.findOne(id);
    await this.configTypeRepository.delete(id);
    return 'delete ok !';
  }

  async updateConfigType(id: string, name: string) {
    await this.findOne(id);
    await this.configTypeRepository.update(id, {
      name,
    });
    return await this.findOne(id);
  }

  // async (): Promise<any> {
  //   return await this.configTypeRepository.findAndCount();
  // }
  async findAll() {
    return await this.configTypeRepository.findAndCount();
  }

  async findByQuery(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [data, total] = await this.configTypeRepository
      .createQueryBuilder('configType')
      .orderBy('configType.id', 'ASC') // optional, but recommended for pagination
      .limit(limit) // LIMIT in PostgreSQL
      .offset(offset) // OFFSET in PostgreSQL
      .getManyAndCount(); // fetch data + total count

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const findOne = await this.configTypeRepository.findOneBy({ id: id });
    if (!findOne) {
      {
        throw new NotFoundException(`khong tim thay configType ${id}`);
      }
    }
    return findOne;
  }
}
