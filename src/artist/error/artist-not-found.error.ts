import { HttpException, HttpStatus } from '@nestjs/common';

export class ARTIST_NOT_FOUND_ERROR extends HttpException {
  constructor() {
    super('Artist not found', HttpStatus.NOT_FOUND);
  }
}
