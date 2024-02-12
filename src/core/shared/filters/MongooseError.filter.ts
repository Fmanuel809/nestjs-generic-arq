import {
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { IAppConfig } from 'src/core/app-config/interfaces/app-config.interface';
import { TranslationService } from 'src/core/translation/translation.service';
import { IErrorResponse } from '../interfaces/error-response.interface';
import { SystemLogService } from '../providers/system-log.service';
import { Error } from 'mongoose';

@Catch(Error)
export class MongooseErrorFilter implements ExceptionFilter {
  constructor(
    private readonly i18nService: TranslationService,
    private readonly cnfService: ConfigService,
    private readonly syetemLogger: SystemLogService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const appCnf = this.cnfService.get<IAppConfig>(ConfigKey.App);
    const logger = new Logger(MongooseErrorFilter.name);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const locale = request.headers['x-locale'] || appCnf.appDefaultLocale;

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.i18nService.translate(
      'exceptions.server_error',
      locale,
    );
    const titleError = this.i18nService.translate('general.httpError', locale);

    const res: IErrorResponse = {
      statusCode: status,
      title: titleError,
      message,
      trace: {
        error: exception.message,
        name: exception.name,
        stack: exception.stack,
      },
    };

    this.syetemLogger.create({
      type: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'error' : 'warn',
      message,
      stack: exception.stack,
      name: exception.name,
      status,
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        body: request.body,
        query: request.query,
      },
    });

    if (status === HttpStatus.INTERNAL_SERVER_ERROR)
      logger.error(`Error on ${request.method}: ${exception.message}`);
    else logger.warn(`Error on ${request.method}: ${exception.message}`);

    response.status(status).json(res);
  }
}
