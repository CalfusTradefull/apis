<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AddressModule } from './address/address.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './userroles/userroles.module';
import { CustomerprofileModule } from './customerprofile/customerprofile.module';
import { CustomerPreferencesModule } from './customerpreferences/customerpreferences.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomerContactsModule } from './customer-contacts/customer-contacts.module';
=======
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CustomersModule } from "./customers/customers.module";
import { AddressModule } from "./address/address.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { UserRolesModule } from "./userroles/userroles.module";
import { CustomerprofileModule } from "./customerprofile/customerprofile.module";
import { CustomerPreferencesModule } from "./customerpreferences/customerpreferences.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

>>>>>>> main
@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomersModule,
    AddressModule,
    UsersModule,
    RolesModule,
    UserRolesModule,
    CustomerprofileModule,
    CustomerPreferencesModule,
    CustomerContactsModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(`from  DAL  ${process.env.DB_TYPE}`)
