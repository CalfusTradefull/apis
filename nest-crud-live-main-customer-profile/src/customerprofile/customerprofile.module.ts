import { Module } from '@nestjs/common';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerprofileController } from './customerprofile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfile])],
  providers: [CustomerprofileService],
  controllers: [CustomerprofileController],
})
export class CustomerprofileModule {}
