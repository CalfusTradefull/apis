import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async getCustomerProfileByProfileId(profile_id: string,): Promise<CustomerProfile> {
      try {
        const profile = await this.customerProfileRepository.findOne({ where: { profile_id },});
        if (!profile) {
          throw new NotFoundException(
            'No customer profile found with given profile_id!',
          );
        }
        return profile;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        } else {
          console.log(error);
          throw new InternalServerErrorException('Error while fetching customer profile');
        }
      }
  }

  async getCustomerProfileByCustomerId(customer_id: string,): Promise<CustomerProfile> {
      try {
        const profile = await this.customerProfileRepository.findOne({
          where: { customer_id },
        });
        if (!profile) {
          throw new NotFoundException(
            'No customer profile found with given customer_id!',
          );
        }
        return profile;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        } else {
          console.log(error);
          throw new InternalServerErrorException('Error while fetching customer profile');
        }
      }
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
      const result = await this.customerProfileRepository.update(profile_id, profile);
      if (result.affected === 0) {
        throw new NotFoundException('No customer profile found with given profile_id!!');
      }
      return await this.customerProfileRepository.findOne({where: { profile_id }});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update customer profile');
      }
    }
  }

  async deleteCustomerProfile(profile_id: string): Promise<void> {
    try {
      await this.customerProfileRepository.delete(profile_id);
    } catch (error) {
      throw error;
    }
  }
}
