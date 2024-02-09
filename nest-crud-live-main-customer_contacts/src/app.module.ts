import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CustomerContactsModule } from './customer-contacts/customer-contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomerContactsModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
