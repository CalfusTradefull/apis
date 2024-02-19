import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer Profile')
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
    return this.customerProfileService.getAllCustomerProfile();
  }

  // Get one customer profile
  @Get('/profileid/:id')
  @ApiOperation({ summary: 'Get a customer profile by profile ID' })
  @ApiResponse({
    status: 200,
    description: 'The customer profile',
    type: CustomerProfile,
  })
  @ApiParam({
    name: 'type',
    enum: 'profile_id',
    type: 'string',
  })
  @ApiParam({ name: 'id', type: 'string' })
  async getCustomerProfileByProfileId(
    @Param('id') profile_id: string,
  ): Promise<CustomerProfile> {
      return this.customerProfileService.getCustomerProfileByProfileId(profile_id);
  }
  
  @Get('/customerid/:id')
  async getCustomerProfileByCustomerId(
    @Param('id') customer_id: string,
  ): Promise<CustomerProfile> {
    return this.customerProfileService.getCustomerProfileByCustomerId(customer_id);
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
    return this.customerProfileService.createCustomerProfile(profile);
  }

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
    @Body() profile: Partial<CustomerProfile>,
  ): Promise<CustomerProfile> {
    return this.customerProfileService.updateCustomerProfile(profile_id, profile);
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
      await this.customerProfileService.getCustomerProfileByProfileId(profile_id);
      return this.customerProfileService.deleteCustomerProfile(profile_id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to delete customer profile');
      }
    }
  }
}
