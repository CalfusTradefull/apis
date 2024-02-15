import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { UserRoleService } from './userrole.service';
import { UserRoleDTO } from './userrole.entity';
import { Logger } from '@nestjs/common';

@Controller()
export class UserRoleController {
  
  constructor(private userroleService: UserRoleService) {}

  @Get('UserRoles/')
  getUserRoles() {
    return this.userroleService.getUserRoles();
  }

  @Get('userroles/:userroleid')
  getUserRolesByUserRoleID(@Param('userroleid') userroleid: string) {
    return this.userroleService.getUserRole(userroleid);
  }

  
  @Get('userroles/userrole/:userid')
  getUserRoleByUserID(@Param('userid') userid: string) {
    return this.userroleService.getUserRoleByUserID(userid);
  }

  @Get('userroles/userrole/:userid/:sessionid')
  getUserRoleByUserIDXXX(@Param('userid') userid: string, @Param('sessionid') sessionid: string) {
    console.log(sessionid)
    return this.userroleService.getUserRoleByUserID(userid);
  }
  @Post('customer/')
  create(@Body() userroleDTO: UserRoleDTO) {
    return this.userroleService.create(userroleDTO);
  }

    //update customer
  @Put(':userroleid')
  update(@Param('userroleid') userroleid: string, @Body() userroleDTO: UserRoleDTO){
    return this.userroleService.update(userroleid, userroleDTO);
  }

  //delete customer
  @Delete(':userroleid')
  delete(@Param('userroleid') userroleid: string) {
    
    return this.userroleService.delete(userroleid);
  }

  
}
