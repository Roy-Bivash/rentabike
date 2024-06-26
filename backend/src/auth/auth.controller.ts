import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: any) {
    return this.authService.login(loginDto, session);
  }

  @Get('logout')
  async logout(@Session() session: any) {
    return this.authService.logout(session);
  }
}
