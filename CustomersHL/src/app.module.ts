import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { CustomerProfileModule } from './customerprofile/customerprofile.module';
import { CustomerPreferencesModule } from './customerpreferences/customerpreferences.module';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';
import { UserRoleModule } from './userroles/userrole.module';
import { CustomerContactModuleHL } from './customercontact/customer-contactHL.module';



@Module({
  imports: [CustomerModule, CustomerProfileModule, CustomerPreferencesModule, UserModule, RoleModule, UserRoleModule, CustomerContactModuleHL],
})
export class AppModule {}
