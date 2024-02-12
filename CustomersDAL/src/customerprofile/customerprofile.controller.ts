import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';

@Controller('customerprofile')
export class CustomerprofileController {
  constructor(
    private readonly customerProfileService: CustomerprofileService,
  ) {}

  // Get all customer profiles
  @Get()
  async getAllCustomerProfile(): Promise<CustomerProfile[]> {
    return await this.customerProfileService.getAllCustomerProfile();
  }

  // Get one customer profile
  @Get(':id')
  async getCustomerProfile(
    @Param('id') profile_id: string,
  ): Promise<CustomerProfile> {
    try {
      console.log('getCustomerProfile | profile_id:', profile_id);
      const profile =
        this.customerProfileService.getCustomerProfile(profile_id);
      if (!profile) {
        throw new Error('User Profile Not found!');
      } else {
        return profile;
      }
    } catch (error) {
      return error;
    }
  }

  // Create customer profile
  @Post()
  async createCustomerProfile(
    @Body() profile: CustomerProfile,
  ): Promise<CustomerProfile> {
    try {
      console.log('Triggered');
      console.log(
        process.env.DB_TYPE,
        process.env.PG_HOST,
        parseInt(process.env.PG_PORT),
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        process.env.PG_DB,
      );
      return this.customerProfileService.createCustomerProfile(profile);
    } catch (error) {
      return error;
    }
  }

  // Update customer profile
  @Put(':id')
  async updateCustomerProfile(
    @Param('id') profile_id: string,
    @Body() profile: CustomerProfile,
  ): Promise<CustomerProfile> {
    try {
      return this.customerProfileService.updateCustomerProfile(
        profile_id,
        profile,
      );
    } catch (error) {
      return error;
    }
  }

  // Delete customer profile
  @Delete(':id')
  async deleteCustomerProfile(@Param('id') profile_id: string): Promise<void> {
    try {
      const profile =
        this.customerProfileService.getCustomerProfile(profile_id);
      if (!profile) {
        throw new Error('Customer profile not found');
      }
      this.customerProfileService.deleteCustomerProfile(profile_id);
    } catch (error) {
      return error;
    }
  }
}
