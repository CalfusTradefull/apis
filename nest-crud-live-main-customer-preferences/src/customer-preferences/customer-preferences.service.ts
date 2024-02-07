// customer-preference.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerPreference } from './customer-preferences-entity';

@Injectable()
export class CustomerPreferenceService {
  constructor(
    @InjectRepository(CustomerPreference)
    private readonly customerPreferenceRepository: Repository<CustomerPreference>,
  ) {}

  async create(
    customerPreference: CustomerPreference,
  ): Promise<CustomerPreference> {
    return this.customerPreferenceRepository.save(customerPreference);
  }

  async getAll(): Promise<CustomerPreference[]> {
    return this.customerPreferenceRepository.find();
  }

  async getById(id: string): Promise<CustomerPreference> {
    const customerPreference = await this.customerPreferenceRepository.findOne({
      where: { customer_preference_id: id },
    });

    if (!customerPreference) {
      throw new NotFoundException('Customer preference not found');
    }

    return customerPreference;
  }

  async updateById(
    id: string,
    customerPreferenceData: CustomerPreference,
  ): Promise<CustomerPreference> {
    await this.getById(id); // Check if the customer preference exists

    await this.customerPreferenceRepository.update(id, customerPreferenceData);

    return this.getById(id);
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.customerPreferenceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Customer preference not found');
    }
  }
}
