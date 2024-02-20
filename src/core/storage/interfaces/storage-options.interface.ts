import { StorageDriver } from 'src/core/storage/types/storage-driver.enum';
import { IS3Config } from 'src/core/app-config/interfaces/s3-config.interface';

/**
 * The options for the storage service
 * @property driver - The storage driver to use
 * @property s3Config - The S3 configuration if using the S3 driver
 */
export interface IStorageOptions {
  /**
   * The storage driver to use
   */
  driver: StorageDriver;

  /**
   * The S3 configuration if using the S3 driver
   */
  s3Config?: IS3Config;
}
