import { Controller, Get, Post, Body, Param, Delete, Put, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  //get all roles
  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Return all roles',
    type: [Role],
  })
  async findAll(): Promise<Role[]> {
    return this.rolesService.findall();
  }

  //get one role
  @Get(':id')
  @ApiOperation({ summary: 'Get a role by roleid' })
  @ApiParam({ name: 'id', description: 'Role ID', type: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Return a role by roleid',
    type: Role,
  })
  async findOne(@Param('id') role_id: string): Promise<Role> {
    return this.rolesService.findOne(role_id);
  }

  //create role
  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: Role,
  })
  @ApiBody({
    type: Role,
    description: 'Role data',
  })
  async create(@Body() role: Role): Promise<Role> {
    return this.rolesService.create(role);
  }

  //update role
  @Put(':id')
  @ApiOperation({ summary: 'Update a role by roleid' })
  @ApiParam({ name: 'id', description: 'roleid', type: 'string' })
  @ApiBody({
    type: Role,
    description: 'Update role data',
  })
  @ApiResponse({
    status: 200,
    description: 'role updated successfully',
    type: Role,
  })
  async update(@Param('id') role_id: string, @Body() role: Partial<Role>): Promise<Role> {
    return this.rolesService.update(role_id, role);
  }

  //delete role
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by roleid' })
  @ApiParam({ name: 'id', description: 'roleid to delete', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully',
  })
  async delete(@Param('id') role_id: string): Promise<void> {
    return this.rolesService.delete(role_id);
  }
}