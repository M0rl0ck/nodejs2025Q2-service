import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { UserStorage } from '../interfaces/user-storage.interface';
import { User } from '../entities/user.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
class UserStore implements UserStorage {
  private users: Map<string, User>;
  constructor() {
    this.users = new Map();
  }
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
  getUserById(id: string): User {
    return this.users.get(id);
  }
  createUser(user: CreateUserDto): User {
    const newUser: User = {
      ...user,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
  updateUser(id: string, user: UpdateUserPasswordDto): User | undefined {
    const userToUpdate = this.users.get(id);
    if (!userToUpdate) {
      return;
    }
    const updatedUser = {
      ...userToUpdate,
      password: user.newPassword,
      version: userToUpdate.version + 1,
      updatedAt: Date.now(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  deleteUser(id: string): boolean {
    const userToDelete = this.getUserById(id);
    if (!userToDelete) {
      return false;
    }
    this.users.delete(id);
    return true;
  }
}

export { UserStore };
