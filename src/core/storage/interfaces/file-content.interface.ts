import { Metadata } from '.';

export interface FileContent {
  metadata: Metadata;
  stream: NodeJS.ReadableStream;
}
