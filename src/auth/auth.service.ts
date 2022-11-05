import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserParamsDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserParamsDto) {
    const userFound = await this.usersService.getByCredentials(
      user.username,
      user.password,
    );

    console.log(userFound);

    const payload = { userId: userFound._id, username: userFound.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserParamsDto) {
    const newUser = await this.usersService.create(user);

    const payload = { userId: newUser._id, username: newUser.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
