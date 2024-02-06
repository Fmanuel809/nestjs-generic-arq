import * as sanitizeHtml from 'sanitize-html';

export const MODULE_CONFIG = 'module_config';
export const MOMENT_WRAPPER = 'moment_wrapper';

// Date fortmats
export const DATE_FORMAT_ISO_8601 = 'YYYY-MM-DDTHH:mm:ssZ';
export const DATE_FORMAT_ISO_8601_WITHOUT_TIMEZONE = 'YYYY-MM-DDTHH:mm:ss';
export const DATE_FORMAT_ISO_8601_DATE_ONLY = 'YYYY-MM-DD';
export const DATE_FORMAT_AMERICAN = 'MM/DD/YYYY';
export const DATE_FORMAT_EUROPEAN = 'DD/MM/YYYY';
export const DATE_FORMAT_AMERICAN_WITH_TIME = 'MM/DD/YYYY HH:mm:ss';
export const DATE_FORMAT_EUROPEAN_WITH_TIME = 'DD/MM/YYYY HH:mm:ss';
export const DATE_FORMAT_24_HOUR_TIME = 'HH:mm:ss';
export const DATE_FORMAT_12_HOUR_TIME = 'hh:mm:ss A';
export const DATE_FORMAT_MONTH_DAY_YEAR = 'MMMM DD, YYYY';
export const DATE_FORMAT_DAY_MONTH_YEAR = 'DD MMMM, YYYY';
export const DATE_FORMAT_YEAR_MONTH_DAY = 'YYYY, MMMM DD';
export const DATE_FORMAT_SHORT_DATE = 'D/M/YY';
export const DATE_FORMAT_SHORT_DATE_WITH_TIME = 'D/M/YY HH:mm:ss';
export const DATE_FORMAT_LONG_DATE = 'dddd, MMMM Do, YYYY';
export const DATE_FORMAT_LONG_DATE_WITH_TIME = 'dddd, MMMM Do, YYYY h:mm:ss a';
export const DATE_FORMAT_MONTH_NAME = 'MMMM';
export const DATE_FORMAT_DAY_NAME = 'dddd';

// Utils
export const SANITIZE_HTML_OPTIONS: sanitizeHtml.IOptions = {
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
