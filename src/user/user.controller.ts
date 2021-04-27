import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { User } from './User.schema';
import { UserService } from './user.service';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  findOrCreateUser(@Body('user') user: User) {
    return this.userService.findOrCreateUser(user)
  }

  @Put()
  updateName(@Query('clientId') clientId: string, @Query('name') name: string) {
    return this.userService.updateName(clientId, name) 
  }
}