import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { TranslationService } from 'src/core/translation/translation.service';
import { IErrorResponse } from '../interfaces/error-response.interface';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/core/app-config/interfaces/app-config.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';

@Catch(mongoose.mongo.MongoError)
export class MongoDbExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly i18nService: TranslationService,
    private readonly cnfService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const logger = new Logger('MongoDBError');
    const appCnf = this.cnfService.get<IAppConfig>(ConfigKey.App);
    logger.error(exception.errmsg || exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const locale = request.headers['x-locale'] || appCnf.appDefaultLocale;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = this.i18nService.translate('mongoError.unknownError', locale);
    const titleError = this.i18nService.translate('general.dbError', locale);

    switch (exception.code) {
      case 11000:
        status = HttpStatus.BAD_REQUEST;
        message = this.i18nService.translate(
          'mongoError.duplicateKeyError',
          locale,
        );
        break;

      case 11600:
      case 11602:
        message = this.i18nService.translate(
          'mongoError.operationInterrupted',
          locale,
        );
        break;

      case 12000:
        message = this.i18nService.translate(
          'mongoError.userInputDataError',
          locale,
        );
        break;

      case 12500:
        message = this.i18nService.translate('mongoError.networkError', locale);
        break;

      case 12501:
        message = this.i18nService.translate(
          'mongoError.networkTimeout',
          locale,
        );
        break;

      case 13111:
        message = this.i18nService.translate(
          'mongoError.writeConflict',
          locale,
        );
        break;

      case 16460:
        message = this.i18nService.translate(
          'mongoError.cursorNotFound',
          locale,
        );
        break;

      case 16500:
        message = this.i18nService.translate(
          'mongoError.writeConcernError',
          locale,
        );
        break;

      case 16755:
        message = this.i18nService.translate(
          'mongoError.indexBuildInProgress',
          locale,
        );
        break;

      default:
        break;
    }

    const res: IErrorResponse = {
      statusCode: status,
      title: titleError,
      message,
      trace: {
        error: exception.errmsg || exception.message,
        name: exception.name,
        stack: exception.stack,
      },
    };

    response.status(status).json(res);
  }
}
