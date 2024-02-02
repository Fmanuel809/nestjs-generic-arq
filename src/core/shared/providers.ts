import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { MongoDbExceptionFilter } from './filters/MongoDbException.filter';

export const SHARED_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: MongoDbExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];
