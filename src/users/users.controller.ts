import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  listUsers() {
    return this.usersService.list();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.usersService.get(userId);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId) {
    return this.usersService.delete(userId);
  }
}
