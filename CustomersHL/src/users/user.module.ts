import { AppConfig } from "../config/AppConfig";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [HttpModule],
  providers: [UserService,
  {
    useValue: AppConfig,  
    provide: 'APP_CONFIG', 
  }],
  controllers: [UserController],
})
export class UserModule {}
