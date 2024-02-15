import { Base64File, BufferedFile } from '.';

export interface StorageRepository {
  uploadFile: (file: any) => Promise<string>;
  uploadFiles: (files: any[]) => Promise<string[]>;
  deleteFile: (file: string) => Promise<void>;
  deleteFiles: (files: string[]) => Promise<void>;

  /**
   * Get a file from the storage repository
   * @param fileKey - The key to store the file under
   * @param format - The format to return the file in
   * @returns The corresponding file in the requested format
   */
  getFile: (
    fileKey: string,
    format: 'buffer' | 'base64' | 'file' | 'url',
  ) => Promise<BufferedFile | Base64File>;
}
