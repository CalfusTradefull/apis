import { Module } from '@nestjs/common';
import { CustomerContactsController } from './customer-contacts.controller';
import { CustomerContactsService } from './customer-contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerContacts } from './customer-contact.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CustomerContacts])],
  controllers: [CustomerContactsController],
  providers: [CustomerContactsService]
})
export class CustomerContactsModule {}
