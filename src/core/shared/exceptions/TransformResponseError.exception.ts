import { HttpException, HttpStatus } from '@nestjs/common';

export class TransformResponseErrorException extends HttpException {
  constructor(error?: Error) {
    super(
      error ||
        'Transform Response Error: An error occurred while transforming the response.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
