import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TranslationService } from 'src/core/translation/translation.service';
import { IErrorResponse } from '../interfaces/error-response.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { IAppConfig } from 'src/core/app-config/interfaces/app-config.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly i18nService: TranslationService,
    private readonly cnfService: ConfigService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const appCnf = this.cnfService.get<IAppConfig>(ConfigKey.App);
    const logger = new Logger(HttpExceptionFilter.name);
    logger.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const locale = request.headers['x-locale'] || appCnf.appDefaultLocale;

    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '';
    const titleError = this.i18nService.translate('general.httpError', locale);

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        message = this.i18nService.translate('exceptions.bad_request', locale);
        break;

      case HttpStatus.UNAUTHORIZED:
        message = this.i18nService.translate('exceptions.unauthorized', locale);
        break;

      case HttpStatus.FORBIDDEN:
        message = this.i18nService.translate('exceptions.forbidden', locale);
        break;

      case HttpStatus.NOT_FOUND:
        message = this.i18nService.translate('exceptions.not_found', locale);
        break;

      case HttpStatus.INTERNAL_SERVER_ERROR:
        message = this.i18nService.translate('exceptions.server_error', locale);
        break;

      case HttpStatus.NOT_IMPLEMENTED:
        message = this.i18nService.translate(
          'exceptions.not_implemented',
          locale,
        );
        break;

      case HttpStatus.BAD_GATEWAY:
        message = this.i18nService.translate('exceptions.bad_gateway', locale);
        break;

      case HttpStatus.SERVICE_UNAVAILABLE:
        message = this.i18nService.translate(
          'exceptions.service_unavailable',
          locale,
        );
        break;

      case HttpStatus.GATEWAY_TIMEOUT:
        message = this.i18nService.translate(
          'exceptions.timeout_error',
          locale,
        );
        break;

      case HttpStatus.UNPROCESSABLE_ENTITY:
        message = this.i18nService.translate(
          'exceptions.validation_error',
          locale,
        );
        break;

      case HttpStatus.METHOD_NOT_ALLOWED:
        message = this.i18nService.translate(
          'exceptions.invalid_operation',
          locale,
        );
        break;

      case HttpStatus.NOT_ACCEPTABLE:
        message = this.i18nService.translate(
          'exceptions.not_acceptable',
          locale,
        );
        break;

      default:
        message = this.i18nService.translate(
          'exceptions.unknown_error',
          locale,
        );
        break;
    }

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

    response.status(status).json(res);
  }
}
