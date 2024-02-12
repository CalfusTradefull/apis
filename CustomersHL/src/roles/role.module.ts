import { AppConfig } from "../config/AppConfig";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [HttpModule],
  providers: [RoleService,
  {
      useValue: AppConfig,  
      provide: 'APP_CONFIG', 
  }],
  controllers: [RoleController],
})
export class RoleModule {}
