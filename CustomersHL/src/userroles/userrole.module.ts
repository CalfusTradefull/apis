import { AppConfig } from "../config/AppConfig";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserRoleService } from './userrole.service';
import { UserRoleController } from './userrole.controller';

@Module({
  imports: [HttpModule],
  providers: [UserRoleService,
  {
      useValue: AppConfig,  
      provide: 'APP_CONFIG', 
  }],
  controllers: [UserRoleController],
})
export class UserRoleModule {}
