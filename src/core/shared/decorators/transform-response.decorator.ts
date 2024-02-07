import { SetMetadata } from '@nestjs/common';
import { ResponseType } from '../enums/response-type.enum';

export const RESPONSE_CONFIG = 'response_config';
export const TransformResponse = (responseConfig: ResponseConfig) =>
  SetMetadata(RESPONSE_CONFIG, responseConfig);

export type ResponseConfig = {
  responseType: ResponseType;
};
