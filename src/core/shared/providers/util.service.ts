import { Injectable, Logger } from '@nestjs/common';
import { minify } from 'html-minifier';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);
  private readonly sanitizeHtmlOptions: sanitizeHtml.IOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1',
      'h2',
      'img',
      'style',
    ]),
    allowedAttributes: {
      '*': ['class', 'id', 'style'],
      img: ['src', 'alt'],
    },
    allowedIframeHostnames: [],
    nonTextTags: ['script', 'textarea', 'noscript'],
    allowVulnerableTags: true,
    exclusiveFilter: (frame) => {
      return frame.tag === 'script';
    },
    textFilter: (text, tagName) => {
      if (tagName === 'title') {
        return '';
      }
      return text;
    },
  };
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
    });
  }

  sanitizeAndMinifyHtml(html: string): string {
    return this.minifyHtml(this.sanitizeHtml(html));
  }
}
