import { AppMimeType } from '../types';

export interface Metadata {
  contentType: AppMimeType;
  contentLength: number;
  contentTransferEnconding: string;
  contentDisposition: string;
}
