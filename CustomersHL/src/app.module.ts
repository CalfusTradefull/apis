import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { CustomerProfileModule } from './customerprofile/customerprofile.module';
import { CustomerPreferencesModule } from './customerpreferences/customerpreferences.module';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';
import { UserRoleModule } from './userroles/userrole.module';



@Module({
  imports: [CustomerModule, CustomerProfileModule, CustomerPreferencesModule, UserModule, RoleModule, UserRoleModule],
})
export class AppModule {}
