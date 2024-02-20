import { StorageDriver } from '../../storage/types/storage-driver.enum';

export interface IAppConfig {
  appName: string;
  appDescription: string;
  appVersion: string;
  appUrl: string;
  appEnv: string;
  appDefaultLocale: string;
  storageDriver: StorageDriver;
}
