import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { User } from './User.schema';
import { UserService } from './user.service';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  findOrCreateUser(@Body() user: User) {
    return this.userService.findOrCreateUser(user)
  }

  @Put("/name/:name")
  updateName(@Param('name') name: string, @Body() body: {clientId: string, name: string }) {
    return this.userService.updateName(body.clientId, body.name) 
  }
}