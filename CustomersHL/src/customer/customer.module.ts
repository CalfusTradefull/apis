import { AppConfig } from "../config/AppConfig";
import { ClsModule } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';


@Module({
  imports: [HttpModule, 
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? uuidv4(),
      },
    }),],
  providers: [CustomerService,
  {
    useValue: AppConfig,  
    provide: 'APP_CONFIG', 
  }],
  controllers: [CustomerController],
})
export class CustomerModule {}
