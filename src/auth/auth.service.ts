import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { createResponseUserDto } from 'src/utils/createResponseUserDto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByLogin(createUserDto.login);
    if (user) {
      console.log(createResponseUserDto(user));
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByLogin(createUserDto.login);
    if (!user || !bcrypt.compareSync(createUserDto.password, user.password)) {
      throw new HttpException(
        'Incorrect login or password',
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
