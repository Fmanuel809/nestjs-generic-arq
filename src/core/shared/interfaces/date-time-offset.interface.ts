/**
 * Interface representing an offset to be applied to a date.
 * @interface
 * @public
 */
export interface IDateTimeOffset {
  /**
   * The number of years to add to the date.
   * @public
   */
  years: number;

  /**
   * The number of months to add to the date.
   * @public
   */
  months: number;

  /**
   * The number of days to add to the date.
   * @public
   */
  days: number;

  /**
   * The number of hours to add to the date.
   * @public
   */
  hours: number;

  /**
   * The number of minutes to add to the date.
   * @public
   */
  minutes: number;

  /**
   * The number of seconds to add to the date.
   * @public
   */
  seconds: number;
}
