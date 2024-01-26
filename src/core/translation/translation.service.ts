import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TranslationService {
  private i18n: Record<string, string> = {};
  private logger = new Logger('I18n Support');
  constructor(@Inject('DEFAULT_LANGUAGE') private defaultLanguage: string) {
    this.i18n = this.loadLanguageFiles();
    this.logger.log(`All language files for [${defaultLanguage}] loaded.`);
  }

  private loadLanguageFiles(language?: string): Record<string, string> {
    const _lang = language || this.defaultLanguage;
    try {
      return fs
        .readdirSync(path.join(__dirname, `./i18n/${_lang}`))
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
          const fileName = file.replace('.json', '');
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const fileContent = require(
            path.join(__dirname, `./i18n/${_lang}/${file}`),
          );
          const entries = Object.entries(fileContent).map(([key, value]) => [
            `${fileName}.${key}`,
            value,
          ]);

          this.logger.log(``);

          return entries;
        })
        .reduce((acc, entries) => {
          return { ...acc, ...Object.fromEntries(entries) };
        }, {});
    } catch (e) {
      this.logger.error(`Failed to load language file for ${_lang}`);
      return {};
    }
  }
}
