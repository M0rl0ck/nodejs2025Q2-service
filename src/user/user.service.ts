import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserStorage } from './interfaces/user-storage.interface';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { INCORRECT_PASS } from './errors/pass-incorrect.error';
import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class UserService {
  constructor(@Inject('UserStorage') private readonly storage: UserStorage) {}
  private createUserDto(user: User): UserDto {
    const { password, ...userDto } = user;
    return userDto;
  }
  create(createUserDto: CreateUserDto) {
    const user = this.storage.createUser(createUserDto);
    return this.createUserDto(user);
  }

  findAll() {
    const users = this.storage.getAllUsers();
    return users.length
      ? users.map((user) => (!!user.password ? this.createUserDto(user) : user))
      : [];
  }

  findOne(id: string) {
    const user = this.storage.getUserById(id);
    return user ? this.createUserDto(user) : undefined;
  }

  update(id: string, updateUserDto: UpdateUserPasswordDto) {
    const user = this.storage.getUserById(id);
    if (!user) {
      return undefined;
    }
    if (updateUserDto.oldPassword !== user.password) {
      throw new INCORRECT_PASS();
    }
    const newUser = this.storage.updateUser(id, updateUserDto);
    return this.createUserDto(newUser);
  }

  remove(id: string) {
    const result = this.storage.deleteUser(id);
    if (!result) {
      throw new NotFoundError();
    }
  }
}
