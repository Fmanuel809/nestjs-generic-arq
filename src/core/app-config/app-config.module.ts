import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config.register';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.env.${
        process.env.NODE_ENV || 'local'
      }`,
      load: [...configurations],
      isGlobal: true,
    }),
  ],
  exports: [],
  providers: [],
})
export class AppConfigModule {}
