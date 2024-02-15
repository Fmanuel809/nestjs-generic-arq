import { AppMimeType } from '../types';

/**
 * Interface for the base64 file
 */
export interface Base64File {
  /**
   * Contains the base64 representation of the file
   */
  base64: string;

  /**
   * The MIME type of the file
   */
  mimeType: AppMimeType;

  /**
   * The name of the file
   */
  name: string;

  /**
   * The size of the file in bytes
   */
  size: number;
}
