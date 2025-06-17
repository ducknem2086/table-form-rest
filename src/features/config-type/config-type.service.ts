import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigType } from './config-type';
import { v4 } from 'uuid';

@Injectable()
export class ConfigTypeService {
  constructor(
    @InjectRepository(ConfigType)
    private readonly configTypeRepository: Repository<ConfigType>,
  ) {}

  async createConfigType(name: string) {
    const configType = this.configTypeRepository.create({
      name: name,
      id: v4(),
    });
    return this.configTypeRepository.save(configType);
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

  async findAll(): Promise<any> {
    return await this.configTypeRepository.findAndCount();
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
