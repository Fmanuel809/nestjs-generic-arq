import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

import { catchError, lastValueFrom } from 'rxjs';
import { IRequestParams } from './IRequestParams';
import { Agent } from 'https';
import { RemoteErrorException } from './remote-error.exception';

@Injectable()
export class RestClientService {
  private readonly logger = new Logger(RestClientService.name);
  constructor(private readonly httpService: HttpService) {}

  /**
   * Envía una solicitud HTTP utilizando Axios y devuelve la respuesta en el formato especificado.
   *
   * @typeparam TModel - Tipo de dato que representa el modelo de la respuesta esperada.
   *
   * @param {IRequestParams}[req] - Objeto que contiene los parámetros de la solicitud (método, acción, cuerpo, URL, configuración, etc.).
   * @returns Una promesa que se resuelve con el modelo de la respuesta esperada.
   * @throws {HttpException} Si ocurre un error durante la solicitud HTTP.
   */
  async sendRequest<TModel>(req: IRequestParams): Promise<TModel> {
    const agent = new Agent({
      rejectUnauthorized: false,
    });
    const requestUrl = `${req.url}/${req.action}`;

    req.config = {
      ...req.config,
      httpsAgent: agent,
    };

    const { data } = await lastValueFrom(
      this.httpService
        .request<TModel>({
          method: req.method,
          url: requestUrl,
          data: req.body,
          ...req.config,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message, error.response?.data);
            throw new RemoteErrorException(error);
          }),
        ),
    );
    return data;
  }
}
