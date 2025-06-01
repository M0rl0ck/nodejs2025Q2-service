import { HttpException, HttpStatus } from '@nestjs/common';

export class INCORRECT_PASS extends Error {
  constructor() {
    super('Incorrect password');
    this.name = 'INCORRECT_PASS';
  }
}

export class INCORRECT_PASS_EXCEPTION extends HttpException {
  constructor() {
    super('oldPassword is wrong', HttpStatus.FORBIDDEN);
    this.name = 'INCORRECT_LOGIN';
  }
}
