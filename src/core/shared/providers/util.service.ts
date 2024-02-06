import { Injectable, Logger } from '@nestjs/common';
import { minify } from 'html-minifier';
import * as sanitizeHtml from 'sanitize-html';
import { SANITIZE_HTML_OPTIONS } from '../contants';

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);
  private readonly sanitizeHtmlOptions = SANITIZE_HTML_OPTIONS;

  constructor() {}

  sanitizeHtml(html: string): string {
    return sanitizeHtml(html, this.sanitizeHtmlOptions);
  }

  minifyHtml(html: string): string {
    return minify(html, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
    });
  }

  sanitizeAndMinifyHtml(html: string): string {
    return this.minifyHtml(this.sanitizeHtml(html));
  }
}
