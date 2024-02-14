import { Controller, Get, Param } from '@nestjs/common';
import { CustomerProfileService } from './customerprofile.service';
import { Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerProfileDTO } from './customerprofiledto';

@ApiTags('Cusomer Profile')
@Controller()
export class CustomerProfileController {
  
  constructor(private customerprofileService: CustomerProfileService) {}

  @Get('profiles/')
  @ApiOperation({ summary: 'Get all customer profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of customer profiles',
    type: [CustomerProfileDTO],
  })
  getProfiles() {
    return this.customerprofileService.getProfiles();
  }

  @Get('customer/profiles/:profileid')
  @ApiOperation({ summary: 'Get customer profile by profileid' })
  @ApiResponse({
    status: 200,
    description: 'List of customer profiles',
    type: CustomerProfileDTO,
  })
  getProfileByProfileID(@Param('profileid') profileid: string) {
    return this.customerprofileService.getProfileByProfileID(profileid);
  }
  
  @Get('customer/profile/:customerid')
  @ApiOperation({ summary: 'Get customer profile by customerid' })
  @ApiResponse({
    status: 200,
    description: 'List of customer profiles',
    type: CustomerProfileDTO,
  })
  getProfileByCustomerID(@Param('customerid') customerid: string) {
    return this.customerprofileService.getProfileByCustomerID(customerid);
  }
  
}
