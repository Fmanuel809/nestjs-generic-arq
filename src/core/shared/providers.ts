import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { MongoDbExceptionFilter } from './filters/MongoDbException.filter';
import { ResponseInterceptor } from './interceptors/Response.interceptor';

export const SHARED_PROVIDERS = [
  {
    provide: APP_FILTER,
    useClass: MongoDbExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
];
