import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';
import { ConfigService } from '@nestjs/config';
import { TranslationService } from 'src/core/translation/translation.service';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { IAppConfig } from 'src/core/app-config/interfaces/app-config.interface';
import { Reflector } from '@nestjs/core';
import { ResponseType } from '../enums/response-type.enum';
import {
  RESPONSE_CONFIG,
  ResponseConfig,
} from '../decorators/transform-response.decorator';
import { IPaginatedData } from '../interfaces/paginated-data.interface';
import { MapperService } from '../providers/mapper.service';
import { TransformResponseErrorException } from '../exceptions/TransformResponseError.exception';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  private readonly logger = new Logger(ResponseInterceptor.name);
  constructor(
    private readonly i18nService: TranslationService,
    private readonly cnfService: ConfigService,
    private reflector: Reflector,
    private readonly mapperService: MapperService,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> {
    const appCnf = this.cnfService.get<IAppConfig>(ConfigKey.App);
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const locale = request.headers['x-locale'] || appCnf.appDefaultLocale;

    const responseConfig = this.reflector.getAllAndOverride<ResponseConfig>(
      RESPONSE_CONFIG,
      [context.getHandler(), context.getClass()],
    );

    return next.handle().pipe(
      map((data) => {
        switch (responseConfig?.responseType || ResponseType.DEFAULT) {
          case ResponseType.PAGINATED:
            const paginatedData: IPaginatedData<T> = data as IPaginatedData<T>;
            return {
              message: this.i18nService.translate(
                'general.operation_success',
                locale,
              ),
              statusCode: HttpStatus.OK,
              data: paginatedData.data,
              meta: {
                currentPage: paginatedData.meta.currentPage,
                totalPages: paginatedData.meta.totalPages,
                pageSize: paginatedData.meta.pageSize,
                totalCount: paginatedData.meta.totalCount,
                hasPrevious: paginatedData.meta.hasPrevious,
                hasNext: paginatedData.meta.hasNext,
              },
            };
          case ResponseType.DROPDOWN:
            const res = (
              Array.isArray(data)
                ? data.map((item: any) => ({
                    value: item._id,
                    label: item.name,
                  }))
                : []
            ) as T;
            return {
              message: this.i18nService.translate(
                'general.operation_success',
                locale,
              ),
              statusCode: HttpStatus.OK,
              data: res,
            };
          default:
            return {
              message: this.i18nService.translate(
                'general.operation_success',
                locale,
              ),
              statusCode: HttpStatus.OK,
              data,
            };
        }
      }),
      catchError((error) => {
        throw new TransformResponseErrorException(error);
      }),
    );
  }
}
