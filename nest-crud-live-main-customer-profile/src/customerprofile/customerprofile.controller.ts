import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';

@Controller('customerprofile')
export class CustomerprofileController {
  constructor(
    private readonly customerProfileService: CustomerprofileService,
  ) {}

  @Get(':id')
  async getCustomerProfile(@Param('id') customer_id: string) {
    try {
      console.log('getCustomerProfile | customer_id:', customer_id);
      const profile =
        this.customerProfileService.getCustomerProfile(customer_id);
      if (!profile) {
        throw new Error('User Profile Not found!');
      } else {
        return profile;
      }
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createCustomerProfile(@Body() profile: CustomerProfile) {
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

  // @Put(':id')
  // async updateCustomerProfile(@Param() id: string, @Body profile: CustomerProfile) {}
}
