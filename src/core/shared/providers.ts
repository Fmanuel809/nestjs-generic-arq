import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { MongoDbExceptionFilter } from './filters/MongoDbException.filter';
import { ResponseInterceptor } from './interceptors/Response.interceptor';
import { DateService } from './providers/date.service';
import { MOMENT_WRAPPER } from './contants';
import { UtilService } from './providers/util.service';

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
  {
    provide: MOMENT_WRAPPER,
    useValue: require('moment'),
  },
  DateService,
  UtilService,
];
