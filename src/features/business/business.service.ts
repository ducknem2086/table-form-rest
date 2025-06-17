import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './business.entity';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  createBusiness(name: string) {
    const business = this.businessRepository.create({
      name: name,
      id: uuidV4(),
    });
    return this.businessRepository.save(business);
  }

  async findAll(): Promise<Business[]> {
    return await this.businessRepository.find();
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.businessRepository.findOneBy({ id });
    if (!business) {
      throw new NotFoundException(`khong tim thay business ${id}`);
    }
    return business;
  }

  async updateBusiness(business: Business) {
    await this.findOne(business.id);
    await this.businessRepository.update(business.id, business);
    return this.businessRepository.findOneBy({ id: business.id });
  }

  async removeBusiness(id: string) {
    await this.findOne(id);
    await this.businessRepository.delete(id);
    return 'delete ok !';
  }
}
