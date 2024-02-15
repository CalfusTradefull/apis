import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './role.entity';
import { Logger } from '@nestjs/common';

@Controller()
export class RoleController {
  
  constructor(private roleService: RoleService) {}

  @Get('roles/')
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get('role/:roleid')
  getRoleByRoleID(@Param('roleid') roleid: string) {
    return this.roleService.getRole(roleid);
  }

  
  @Post('role/')
  create(@Body() roleDTO: RoleDTO) {
    return this.roleService.create(roleDTO);
  }

    //update customer
  @Put(':roleid')
  update(@Param('roleid') roleid: string, @Body() roleDTO: RoleDTO){
    return this.roleService.update(roleid, roleDTO);
  }

  //delete customer
  @Delete(':roleid')
  delete(@Param('roleid') roleid: string) {
    
    return this.roleService.delete(roleid);
  }

  
}
