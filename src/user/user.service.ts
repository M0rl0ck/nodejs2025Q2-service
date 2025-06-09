import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { INCORRECT_PASS } from './errors/pass-incorrect.error';
import { NotFoundError } from '../errors/not-found.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}
  private createUserDto(user: User): UserDto {
    const { password, ...userDto } = user;
    return userDto;
  }
  private createHashPassword = (password: string) => {
    return createHash('sha256').update(password).digest('hex');
  };
  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepository.save(createUserDto);
    return this.createUserDto(user);
  }

  async findAll() {
    const users = await this.UserRepository.find();
    return users.length
      ? users.map((user) => (!!user.password ? this.createUserDto(user) : user))
      : [];
  }

  async findOne(id: string) {
    const user = await this.UserRepository.findOneBy({ id });
    return user ? this.createUserDto(user) : undefined;
  }

  async update(id: string, updateUserDto: UpdateUserPasswordDto) {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) {
      return undefined;
    }
    if (updateUserDto.oldPassword !== user.password) {
      throw new INCORRECT_PASS();
    }
    const newUser = await this.UserRepository.save({
      id,
      password: updateUserDto.newPassword,
    });
    return this.createUserDto(newUser);
  }

  async remove(id: string) {
    const result = await this.UserRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundError();
    }
  }
}
