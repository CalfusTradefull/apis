import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerContactControllerHL } from './customer-contactHL.controller';
import { CustomerContactServiceHL } from './customer-contactHL.service';
import { AppConfig } from 'src/config/AppConfig';

@Module({
  imports:[HttpModule],
  controllers: [CustomerContactControllerHL],
  providers: [CustomerContactServiceHL,
    {
    provide: 'APP_CONFIG', 
    useValue: AppConfig,
  }
],
})
export class CustomerContactModuleHL {}
