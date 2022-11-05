import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserParamsDto } from './dto/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: UserParamsDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: UserParamsDto) {
    return this.authService.register(body);
  }
}
