import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerProfile } from './customerprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerprofileService {
  constructor(
    @InjectRepository(CustomerProfile)
    private customerProfileRepository: Repository<CustomerProfile>,
  ) {}

  async getAllCustomerProfile(): Promise<CustomerProfile[]> {
    return this.customerProfileRepository.find();
  }

  async getCustomerProfileByProfileId(
    profile_id: string,
  ): Promise<CustomerProfile> {
    const profile = await this.customerProfileRepository.findOne({
      where: { profile_id },
    });
    if (!profile) {
      throw new NotFoundException(
        'No customer profile found with given profile_id!',
      );
    }
    return profile;
  }

  async getCustomerProfileByCustomerId(
    customer_id: string,
  ): Promise<CustomerProfile> {
    const profile = await this.customerProfileRepository.findOne({
      where: { customer_id },
    });
    if (!profile) {
      throw new NotFoundException(
        'No customer profile found with given customer_id!',
      );
    }
    return profile;
  }

  async createCustomerProfile(
    profile: CustomerProfile,
  ): Promise<CustomerProfile> {
    try {
      const newProfile = await this.customerProfileRepository.create(profile);
      return await this.customerProfileRepository.save(newProfile);
    } catch (error) {
      return error;
    }
  }

  async updateCustomerProfile(
    profile_id: string,
    profile: Partial<CustomerProfile>,
  ): Promise<CustomerProfile> {
    try {
      await this.getCustomerProfileByProfileId(profile_id);
      await this.customerProfileRepository.update(profile_id, profile);
      return await this.customerProfileRepository.findOne({
        where: { profile_id },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteCustomerProfile(profile_id: string): Promise<void> {
    try {
      await this.customerProfileRepository.delete(profile_id);
    } catch (error) {
      return error;
    }
  }
}
