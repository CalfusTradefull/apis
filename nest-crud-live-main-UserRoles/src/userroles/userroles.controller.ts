import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserRolesService } from './userroles.service';
import { UserRole } from './userrole.entity';

@Controller('userroles')
export class UserRolesController {
  constructor(private readonly userrolesService: UserRolesService) {}

  //get all userroles
  @Get()
  async findAll(): Promise<UserRole[]> {
    return await this.userrolesService.findall();
  }

  //get one user
  @Get(':id')
  async findOne(@Param('id') user_role_id: string): Promise<UserRole> {
    const user = await this.userrolesService.findOne(user_role_id);
    if (!user) {
      throw new Error('UserRole not found');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: UserRole): Promise<UserRole> {
    return await this.userrolesService.create(user);
  }

  //update user
  @Put(':id')
  async update(@Param('id') user_role_id: string, @Body() userrole: UserRole): Promise<UserRole> {
    return this.userrolesService.update(user_role_id, userrole);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') user_role_id: string): Promise<void> {
    //handle the error if user not found
    const user = await this.userrolesService.findOne(user_role_id);
    if (!user) {
      throw new Error('UserRole not found');
    }
    return this.userrolesService.delete(user_role_id);
  }
}
