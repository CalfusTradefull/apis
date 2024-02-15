import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findall();
  }

  //get one user
  @Get(':id')
  async findOne(@Param('id') user_id: string): Promise<User> {
    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  //update user
  @Put(':id')
  async update(@Param('id') user_id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(user_id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') user_id: string): Promise<void> {
    //handle the error if user not found
    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersService.delete(user_id);
  }
}
