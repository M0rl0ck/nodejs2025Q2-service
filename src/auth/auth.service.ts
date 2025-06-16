import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { createResponseUserDto } from 'src/utils/createResponseUserDto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
    return `This action returns a #${createUserDto.login} auth`;
  }
}
