import { StorageDriver } from '../enums/storage-driver.enum';

export interface IAppConfig {
  appName: string;
  appDescription: string;
  appVersion: string;
  appUrl: string;
  appEnv: string;
  appDefaultLocale: string;
  storageDriver: StorageDriver;
}
