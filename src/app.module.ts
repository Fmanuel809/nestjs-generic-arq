import { Module } from '@nestjs/common';
import { AppConfigModule } from './core/app-config/app-config.module';
import { TranslationModule } from './core/translation/translation.module';
import { MailPoolModule } from './core/mail-pool/mail-pool.module';
import { SharedModule } from './core/shared/shared.module';
import { AuthModule } from './core/auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { LANGUAGES } from './core/translation/constants/languages.const';
import { DatabaseModule } from './core/database/database.module';
import { RestClientModule } from './core/rest-client/rest-client.module';
import { StorageModule } from './core/storage/storage.module';
import { StorageDriver } from './core/app-config/enums/storage-driver.enum';
@Module({
  imports: [
    DatabaseModule.forRoot({
      autoRegisterModels: true,
    }),
    TranslationModule.forRoot(
      process.env.APP_DEFAULT_LOCALE || LANGUAGES.ENGLISH,
    ),
    StorageModule.forRoot({
      driver: process.env.STORAGE_DRIVER as StorageDriver,
      s3Config: {
        endPoint: process.env.S3_END_POINT,
        port: parseInt(process.env.S3_PORT, 10),
        useSSL: process.env.S3_USE_SSL === 'true',
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        objectLocking: process.env.S3_OBJECT_LOCKING === 'true',
        retentionPeriod: parseInt(process.env.S3_RETENTION_PERIOD, 10),
      },
    }),
    SharedModule.forRoot(),
    RestClientModule,
    AppConfigModule,
    MailPoolModule,
    AuthModule,
    TestModule,
  ],
  providers: [],
})
export class AppModule {}
