import { AppMimeType } from '../types/mime-types';

/**
 * Interface for a file that has been buffered.
 * This is useful for when you want to store a file in memory before writing it to disk.
 */
export interface BufferedFile {
  /**
   * The name of the field that the file was uploaded as
   */
  fieldname: string;

  /**
   * The name of the file
   */
  originalname: string;

  /**
   * The encoding of the file
   */
  encoding: string;

  /**
   * The MIME type of the file
   */
  mimetype: AppMimeType;

  /**
   * The size of the file in bytes
   */
  size: number;

  /**
   * The buffer representation of the file
   */
  buffer: Buffer | string;
}
