import { HttpException, HttpStatus } from '@nestjs/common';

export class TRACK_NOT_FOUND_ERROR extends HttpException {
  constructor() {
    super('Track not found', HttpStatus.NOT_FOUND);
  }
}
