import { SetMetadata } from '@nestjs/common';
import { ResponseType } from '../enums/response-type.enum';

export const RESPONSE_TYPE_KEY = 'response_type';
export const TransformResponse = (responseType: ResponseType) =>
  SetMetadata(RESPONSE_TYPE_KEY, responseType);
