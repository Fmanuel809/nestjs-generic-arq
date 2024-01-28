import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums/config-key.enum';
import { Environment } from './enums/env.enum';
import { IDatabaseConfig } from './interfaces/database.interface';
import { IAppConfig } from './interfaces/app-config.interface';

const APPConfig = registerAs<IAppConfig>(ConfigKey.App, () => {
  return {
    appEnv:
      Environment[process.env.NODE_ENV as keyof typeof Environment] ||
      Environment.Local,
    appName: process.env.APP_NAME,
    appDescription: process.env.APP_DESCRIPTION,
    appVersion: process.env.APP_VERSION,
    appUrl: process.env.APP_URL,
    appDefaultLocale: process.env.APP_DEFAULT_LOCALE,
  };
});

const DBConfig = registerAs<IDatabaseConfig>(ConfigKey.Db, () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  authDataBase: process.env.DATABASE_AUTH_DATABASE,
}));

export const configurations = [APPConfig, DBConfig];
