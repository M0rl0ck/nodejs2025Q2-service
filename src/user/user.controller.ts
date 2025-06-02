import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import {
  INCORRECT_PASS_EXCEPTION,
  INCORRECT_PASS,
} from './errors/pass-incorrect.error';
import { USER_NOT_FOUND_ERROR } from './errors/user-not-found.error';
import { NotFoundError } from '../errors/not-found.error';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new USER_NOT_FOUND_ERROR();
    }
    return user;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    try {
      const user = this.userService.update(id, updateUserDto);
      if (!user) {
        throw new USER_NOT_FOUND_ERROR();
      }
      return user;
    } catch (error) {
      if (error instanceof INCORRECT_PASS) {
        throw new INCORRECT_PASS_EXCEPTION();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new USER_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }
}
