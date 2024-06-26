import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  async getCurrentUser(@Session() session: any) {
    return this.userService.getCurrentUser(session);
  }

  @Get('map')
  async getMapInfo() {
    return this.userService.getMapInfo();
  }

  @Post('newUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('usersList')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('changeRole')
  async changeRole(@Body() changeRoleDto: ChangeRoleDto) {
    return this.userService.changeRole(changeRoleDto);
  }
}
