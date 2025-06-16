import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signUp(createAuthDto);
  }

  @Post('login')
  async login(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.login(createAuthDto);
  }
}
