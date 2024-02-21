import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './role.entity';
import { Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller()
export class RoleController {
  
  constructor(private roleService: RoleService) {}

  @Get('roles/')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Return all roles',
    type: [RoleDTO],
  })
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get('role/:roleid')
  @ApiOperation({ summary: 'Get a role by roleid' })
  @ApiParam({ name: 'roleid', description: 'Role ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return a role by roleid',
    type: RoleDTO,
  })
  getRoleByRoleID(@Param('roleid') roleid: string) {
    return this.roleService.getRole(roleid);
  }

  
  @Post('role/')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: RoleDTO,
  })
  @ApiBody({
    type: RoleDTO,
    description: 'Role data',
  })
  create(@Body() roleDTO: RoleDTO) {
    return this.roleService.create(roleDTO);
  }

  //update customer
  @Put('role/:roleid')
  @ApiOperation({ summary: 'Update a role by roleid' })
  @ApiParam({ name: 'roleid', description: 'roleid', type: 'string' })
  @ApiBody({
    type: RoleDTO,
    description: 'Update role data',
  })
  @ApiResponse({
    status: 200,
    description: 'role updated successfully',
    type: RoleDTO,
  })
  update(@Param('roleid') roleid: string, @Body() roleDTO: Partial<RoleDTO>){
    return this.roleService.update(roleid, roleDTO);
  }

  //delete customer
  @Delete('role/:roleid')
  @ApiOperation({ summary: 'Delete a role by roleid' })
  @ApiParam({ name: 'roleid', description: 'roleid to delete', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully',
  })
  delete(@Param('roleid') roleid: string) {
    return this.roleService.delete(roleid);
  }
  
}
