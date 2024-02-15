import { AppConfig } from "../config/AppConfig";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customerprofile.service';
import { CustomerProfileController } from './customerprofile.controller';

@Module({
  imports: [HttpModule],
  providers: [CustomerProfileService,
  {
      useValue: AppConfig,  
      provide: 'APP_CONFIG', 
  }],
  controllers: [CustomerProfileController],
})
export class CustomerProfileModule {}
