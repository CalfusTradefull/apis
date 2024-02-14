import { Controller, Get, Param } from '@nestjs/common';
import { CustomerProfileService } from './customerprofile.service';
import { Logger } from '@nestjs/common';

@Controller()
export class CustomerProfileController {
  
  constructor(private customerprofileService: CustomerProfileService) {}

  @Get('profiles/')
  getProfiles() {
    return this.customerprofileService.getProfiles();
  }

  @Get('customer/profiles/:profileid')
  getProfileByProfileID(@Param('profileid') profileid: string) {
    return this.customerprofileService.getProfileByProfileID(profileid);
  }
  
  @Get('customer/profile/:customerid')
  getProfileByCustomerID(@Param('customerid') customerid: string) {
    return this.customerprofileService.getProfileByCustomerID(customerid);
  }
  
}
