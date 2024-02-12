import { StorageDriver } from 'src/core/app-config/enums/storage-driver.enum';
import { IS3Config } from 'src/core/app-config/interfaces/s3-config.interface';

export interface IStorageOptions {
  driver: StorageDriver;
  s3Config: IS3Config;
}

export interface StorageOptionsFactory {
  createStorageOptions(): Promise<IStorageOptions> | IStorageOptions;
}
