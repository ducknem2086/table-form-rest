import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './config';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { IConfigDto } from './config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  getAllConfig() {
    return this.configRepository.query(` SELECT o.id,
                                                o.desc,
                                                o."dateFrom",
                                                o."dateTo",
                                                o."status",
                                                u."name" AS "configTypeName",
                                                u.id     AS "configTypeId"
                                         FROM public."Config" o
                                                LEFT JOIN public."ConfigType" u ON o."configTypeId" = u."id"`);
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
      throw new NotFoundException(`khong tim thay config ${id}`);
    }
    return findOne;
  }
}
