import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TranslationService implements OnModuleInit {
  private i18n: Record<string, string> = {};
  private logger = new Logger('TranslationModule');
  constructor(@Inject('DEFAULT_LANGUAGE') private defaultLanguage: string) {}

  onModuleInit() {
    this.i18n = this.loadLanguageFiles();
    if (this.i18n) {
      this.logger.log(
        `Loaded ${Object.keys(this.i18n).length} translations for [${
          this.defaultLanguage
        }].`,
      );
    } else {
      this.logger.warn(`No translations loaded for [${this.defaultLanguage}].`);
    }
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

          return entries;
        })
        .reduce(
          (acc, entries) => {
            return { ...acc, ...Object.fromEntries(entries) };
          },
          null as Record<string, string>,
        );
    } catch (e) {
      this.logger.error(
        `Failed to load language file for [${_lang}].`,
        `Error: ${e.message}`,
      );
      return null;
    }
  }

  /**
   * Translates a key to the specified language or the default language.
   *
   * @param key - The translation key to look up.
   * @param language - The optional language code.
   * @returns The translated string for the given key in the specified language, or the default language.
   *          If the key is not found in any language, the key itself is returned.
   */
  public translate(key: string, language?: string): string {
    if (language && language !== this.defaultLanguage) {
      const i18n = this.loadLanguageFiles(language);
      if (!i18n) return key;
      return i18n[key];
    }
    return this.i18n[key] || key;
  }
}
