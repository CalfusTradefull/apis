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

  async getAllCustomerProfile(): Promise<CustomerProfile[]> {
    return this.customerProfileRepository.find();
  }

  async getCustomerProfile(profile_id: string): Promise<CustomerProfile> {
    return await this.customerProfileRepository.findOne({
      where: { profile_id },
    });
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    profile: Partial<CustomerProfile>,
  ): Promise<CustomerProfile> {
    try {
      const userProfile = await this.getCustomerProfile(profile_id);
      if (userProfile) {
        await this.customerProfileRepository.update(profile_id, profile);
        return await this.customerProfileRepository.findOne({
          where: { profile_id },
        });
      } else {
        throw new Error('Profile does not exist!');
      }
    } catch (error) {
      console.log(error);
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
