import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customer_address } from './customer-address.entity';
import { CustomerAddressController } from './customer-address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([customer_address])],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
