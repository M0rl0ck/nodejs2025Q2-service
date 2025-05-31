import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserStore } from './store/user.storage';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStorage',
      useClass: UserStore,
    },
  ],
})
export class UserModule {}
