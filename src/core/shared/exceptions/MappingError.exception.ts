import { ErrorHandler } from '@automapper/core';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MappingErrorException extends HttpException {
  constructor(error?: Error) {
    super(
      error || 'Mapping Error: An error occurred while mapping.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class MappingErrorHandler implements ErrorHandler {
  handle(error: Error): void {
    throw new MappingErrorException(error);
  }
}
