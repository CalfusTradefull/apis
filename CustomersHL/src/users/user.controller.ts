import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.entity';
import { Logger } from '@nestjs/common';

@Controller()
export class UserController {
  
  constructor(private userService: UserService) {}

  @Get('users/')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('user/:userid')
  getUserByUserID(@Param('userid') userid: string) {
    return this.userService.getUser(userid);
  }

  
  @Post('user/')
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

    //update customer
  @Put(':userid')
  update(@Param('userid') userid: string, @Body() userDTO: UserDTO){
    return this.userService.update(userid, userDTO);
  }

  //delete customer
  @Delete(':userid')
  delete(@Param('userid') userid: string) {
    
    return this.userService.delete(userid);
  }

  
}
