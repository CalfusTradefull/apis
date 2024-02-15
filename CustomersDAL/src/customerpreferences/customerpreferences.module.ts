import { Module } from '@nestjs/common';
import { CustomerPreferencesController } from './customerpreferences.controller';
import { CustomerPreferenceService } from './customerpreferences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPreference } from './customerpreferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerPreference])],
  controllers: [CustomerPreferencesController],
  providers: [CustomerPreferenceService],
})
export class CustomerPreferencesModule {}
