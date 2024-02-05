import { Module } from '@nestjs/common';
import { UserRolesController } from './userroles.controller';
import { UserRolesService } from './userroles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './userrole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRolesController],
  providers: [UserRolesService]
})
export class UserRolesModule {}
