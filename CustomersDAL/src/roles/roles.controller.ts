import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  //get all roles
  @Get()
  async findAll(): Promise<Role[]> {
    return await this.rolesService.findall();
  }

  //get one role
  @Get(':id')
  async findOne(@Param('id') role_id: string): Promise<Role> {
    const role = await this.rolesService.findOne(role_id);
    if (!role) {
      throw new Error('Role not found');
    } else {
      return role;
    }
  }

  //create role
  @Post()
  async create(@Body() role: Role): Promise<Role> {
    return await this.rolesService.create(role);
  }

  //update role
  @Put(':id')
  async update(@Param('id') role_id: string, @Body() role: Role): Promise<Role> {
    return this.rolesService.update(role_id, role);
  }

  //delete role
  @Delete(':id')
  async delete(@Param('id') role_id: string): Promise<void> {
    //handle the error if role not found
    const role = await this.rolesService.findOne(role_id);
    if (!role) {
      throw new Error('Role not found');
    }
    return this.rolesService.delete(role_id);
  }
}
