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
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('customerprofile')
export class CustomerprofileController {
  constructor(
    private readonly customerProfileService: CustomerprofileService,
  ) {}

  // Get all customer profiles
  @Get()
  @ApiOperation({ summary: 'Get all customer profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of customer profiles',
    type: [CustomerProfile],
  })
  async getAllCustomerProfile(): Promise<CustomerProfile[]> {
    return await this.customerProfileService.getAllCustomerProfile();
  }

  // Get one customer profile using profile_id or customer_id
  @Get('/:type/:id')
  @ApiOperation({ summary: 'Get a customer profile by type and ID' })
  @ApiResponse({
    status: 200,
    description: 'The customer profile',
    type: CustomerProfile,
  })
  @ApiParam({
    name: 'type',
    enum: ['profile_id', 'customer_id'],
    type: 'string',
  })
  @ApiParam({ name: 'id', type: 'string' })
  async getCustomerProfile(
    @Param('type') type: 'profile_id' | 'customer_id',
    @Param('id') id: string,
  ): Promise<CustomerProfile> {
    try {
      let profile: CustomerProfile;
      if (type === 'profile_id') {
        profile =
          await this.customerProfileService.getCustomerProfileByProfileId(id);
      } else {
        profile =
          await this.customerProfileService.getCustomerProfileByCustomerId(id);
      }
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
  @ApiOperation({ summary: 'Create a new customer profile' })
  @ApiResponse({
    status: 201,
    description: 'The newly created customer profile',
    type: CustomerProfile,
  })
  @ApiBody({ type: CustomerProfile })
  async createCustomerProfile(
    @Body() profile: CustomerProfile,
  ): Promise<CustomerProfile> {
    try {
      return this.customerProfileService.createCustomerProfile(profile);
    } catch (error) {
      return error;
    }
  }

  // Update customer profile
  @Put(':id')
  @ApiOperation({ summary: 'Update a customer profile by profile_id' })
  @ApiParam({ name: 'id', description: 'Customer Profile ID', type: 'string' })
  @ApiBody({
    type: CustomerProfile,
    description: 'Updated customer profile data',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer profile updated successfully',
    type: CustomerProfile,
  })
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
  @ApiOperation({ summary: 'Delete a customer profile by ID' })
  @ApiParam({ name: 'id', description: 'Profile ID to delete', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Customer profile deleted successfully',
  })
  async deleteCustomerProfile(@Param('id') profile_id: string): Promise<void> {
    try {
      await this.customerProfileService.getCustomerProfileByProfileId(
        profile_id,
      );
      this.customerProfileService.deleteCustomerProfile(profile_id);
    } catch (error) {
      return error;
    }
  }
}
