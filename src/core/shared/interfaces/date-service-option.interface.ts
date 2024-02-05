/**
 * Interface for date service options.
 */
export interface IDateServiceOption {
  /**
   * Locale code for the date. For example: 'es' for Spanish, 'en' for English.
   * If not provided, the default locale will be used.
   */
  locale?: string;

  /**
   * Format of the date. Must be a valid date format.
   * If not provided, the default format will be used.
   */
  format?: string;

  /**
   * If true, keeps local time when converting the date. If false, converts the date to UTC.
   * If not provided, false is assumed by default.
   */
  keepLocalTime?: boolean;

  /**
   * If true, applies strict validation when parsing the date. If false, applies non-strict validation.
   * If not provided, false is assumed by default.
   */
  strict?: boolean;

  /**
   * If true, omits weekends when calculating dates. If false, includes weekends.
   * If not provided, false is assumed by default.
   */
  omitWeekend?: boolean;

  /**
   * If true, omits holidays when calculating dates. If false, includes holidays.
   * If not provided, false is assumed by default.
   */
  omitHoliday?: boolean;
}
