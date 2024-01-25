import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TranslationService {
  private i18n: Record<string, string> = {};
  constructor(@Inject('DEFAULT_LANGUAGE') private defaultLanguage: string) {
    this.i18n = this.loadLanguageFiles();
    //console.log(defaultLanguage, this.i18n['exceptions.test']);
  }

  private loadLanguageFiles(language?: string): Record<string, string> {
    const _lang = language || this.defaultLanguage;
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

        return entries;
      })
      .reduce((acc, entries) => {
        return { ...acc, ...Object.fromEntries(entries) };
      }, {});
  }
}
