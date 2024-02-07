import { Module } from '@nestjs/common';
import { CustomerPreferencesController } from './customer-preferences.controller';
import { CustomerPreferenceService } from './customer-preferences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPreference } from './customer-preferences-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerPreference])],
  controllers: [CustomerPreferencesController],
  providers: [CustomerPreferenceService],
})
export class CustomerPreferencesModule {}
