import { AppConfig } from "../config/AppConfig";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';


@Module({
  imports: [HttpModule],
  providers: [CustomerService,
  {
    useValue: AppConfig,  
    provide: 'APP_CONFIG', 
  }],
  controllers: [CustomerController],
})
export class CustomerModule {}
