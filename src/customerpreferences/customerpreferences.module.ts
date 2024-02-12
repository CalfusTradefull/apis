import { AppConfig } from "../config/AppConfig";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerPreferencesService } from './customerpreferences.service';
import { CustomerPreferencesController } from './customerpreferences.controller';

@Module({
  imports: [HttpModule],
  providers: [CustomerPreferencesService,
  {
      useValue: AppConfig,  
      provide: 'APP_CONFIG', 
  }],
  controllers: [CustomerPreferencesController],
})
export class CustomerPreferencesModule {}
