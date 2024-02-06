import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerProfile } from './customerprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerprofileService {
  constructor(
    @InjectRepository(CustomerProfile)
    private customerProfileRepository: Repository<CustomerProfile>,
  ) {}

  async getCustomerProfile(customer_id: string): Promise<CustomerProfile> {
    return await this.customerProfileRepository.findOne({
      where: { customer_id },
    });
  }

  async createCustomerProfile(
    profile: CustomerProfile,
  ): Promise<CustomerProfile> {
    try {
      const newProfile = await this.customerProfileRepository.create(profile);
      console.log(newProfile);
      const op = await this.customerProfileRepository.save(newProfile);
      console.log(op);
      return op;
    } catch (error) {
      return error;
    }
  }
}
