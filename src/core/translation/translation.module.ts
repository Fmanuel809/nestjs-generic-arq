import { Global, Module } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Global()
@Module({
  providers: [
    TranslationService,
    {
      provide: 'DEFAULT_LANGUAGE',
      useValue: 'en',
    },
  ],
  exports: [TranslationService],
})
export class TranslationModule {
  static forRoot(defaultLanguage: string): any {
    return {
      module: TranslationModule,
      providers: [
        {
          provide: 'DEFAULT_LANGUAGE',
          useValue: defaultLanguage,
        },
        TranslationService,
      ],
      exports: [TranslationService],
    };
  }
}
