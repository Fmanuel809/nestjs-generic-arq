import { Inject, Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';
import { IDateServiceOption } from '../interfaces/date-service-option.interface';
import { MODULE_CONFIG, MOMENT_WRAPPER } from '../contants';
import { ModuleConfig } from '../module-config.type';
import { IDateTimeOffset } from '../interfaces/date-time-offset.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Holiday } from '../models/holiday.model';

/**
 * DateService class provides various utility functions related to date manipulation.
 * @class
 * @public
 * @injectable
 */
@Injectable()
export class DateService {
  private readonly logger = new Logger(DateService.name);

  /**
   * Constructor for DateService class.
   * @constructor
   * @param momentService - Moment library wrapper for date manipulation.
   * @param config - Module configuration options.
   */
  constructor(
    @InjectModel(Holiday.name) private readonly holidayModel: Model<Holiday>,
    @Inject(MOMENT_WRAPPER) private readonly momentService: typeof moment,
    @Inject(MODULE_CONFIG) private config?: ModuleConfig,
  ) {}

  /**
   * Formats the given date according to the specified options.
   * @public
   * @param date - The date to be formatted.
   * @param options - Formatting options.
   * @returns The formatted date as a string.
   * @throws Throws an error if formatting fails.
   */
  public format(
    date: Date,
    options: IDateServiceOption = this.config.dateServiceOptions,
  ): string {
    try {
      return this.momentService(date, options.strict)
        .utc(options.keepLocalTime)
        .locale(options.locale)
        .format(options.format);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Calculates the date after applying the specified offset to the given date.
   * @public
   * @param date - The base date.
   * @param offset - The offset to be applied.
   * @returns The resulting date after applying the offset.
   * @throws Throws an error if calculation fails.
   */
  public getOffsetDate(date: Date, offset: IDateTimeOffset): Date {
    try {
      return this.momentService(date)
        .add({
          years: offset.years ?? 0,
          months: offset.months ?? 0,
          days: offset.days ?? 0,
          hours: offset.hours ?? 0,
          minutes: offset.minutes ?? 0,
          seconds: offset.seconds ?? 0,
        })
        .toDate();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Checks if two dates are the same based on the specified time measure.
   * @public
   * @param endDate - The end date for comparison.
   * @param initDate - The initial date for comparison.
   * @param timeMeasure - The time measure for the comparison.
   * @returns True if the two dates are the same, otherwise false.
   * @throws Throws an error if the comparison fails.
   */
  public isSame(
    endDate: Date,
    initDate: Date,
    timeMeasure: moment.unitOfTime.StartOf,
  ): boolean {
    try {
      return this.momentService(endDate).isSame(initDate, timeMeasure);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Converts a date integer to a formatted string using the specified options.
   * @public
   * @param date - The date as an integer.
   * @param options - Formatting options.
   * @returns The formatted date as a string.
   * @throws Throws an error if conversion fails.
   */
  dateIntegerToFormatString(date: number, options: IDateServiceOption): string {
    try {
      return this.format(new Date(date), options);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Calculates the time difference between two dates with optional exclusions.
   * @public
   * @param endDate - The end date.
   * @param initDate - The initial date.
   * @param unitTime - The unit of time for the difference calculation.
   * @param options - Additional options for the calculation.
   * @returns The time difference between the two dates.
   * @throws Throws an error if the calculation fails.
   */
  public async timeDifference(
    endDate: Date,
    initDate: Date,
    unitTime: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds',
    options: IDateServiceOption,
  ): Promise<number> {
    try {
      const holidays = await this.holidayModel.find<Holiday>();
      let excludeDatesDiff = 0;
      if (options.omitHoliday) {
        const mappedHoliday = holidays.map((holiday) => {
          return holiday.isMoveable ? holiday.holidayDate : holiday.date;
        });
        mappedHoliday.forEach((excludeDate) => {
          const excludeDateMoment = this.momentService(excludeDate).utc(
            options.keepLocalTime,
          );
          if (
            excludeDateMoment.isBetween(
              this.momentService(initDate).utc(options.keepLocalTime),
              this.momentService(endDate).utc(options.keepLocalTime),
            )
          ) {
            if (
              excludeDateMoment.day() !== 0 &&
              excludeDateMoment.day() !== 6
            ) {
              excludeDatesDiff += 1;
            }
          }
        });
      }

      if (options.omitWeekend) {
        const endDateMoment = this.momentService(endDate).utc(
          options.keepLocalTime,
        );
        const initDateMoment = this.momentService(initDate).utc(
          options.keepLocalTime,
        );
        const diff = endDateMoment.diff(initDateMoment, unitTime, true);
        const days = endDateMoment.diff(initDateMoment, 'days', true);
        let weekends = Math.floor(days / 7) * 2;
        const mod = days % 7;
        if (mod > 0) {
          const initDay = initDateMoment.day();
          const endDay = endDateMoment.day();
          if (initDay > endDay) {
            if (initDay === 0) {
              weekends++;
            } else if (endDay !== 6) {
              weekends++;
            }
          } else if (endDay === 6) {
            weekends++;
          } else if (initDay !== 0) {
            weekends++;
          }
        }

        return (
          diff -
          this.momentService.duration(weekends, 'days').as(unitTime) -
          this.momentService.duration(excludeDatesDiff, 'days').as(unitTime)
        );
      } else {
        const resultDiff = this.momentService(endDate)
          .utc(options.keepLocalTime)
          .diff(
            this.momentService(initDate).utc(options.keepLocalTime),
            unitTime,
            true,
          );

        const holidaysDiff = this.momentService
          .duration(excludeDatesDiff, 'days')
          .as(unitTime);

        return resultDiff - holidaysDiff;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Adds the specified value to the given date based on the specified time unit.
   * @public
   * @param date - The date to which the value will be added.
   * @param unitTime - The unit of time for the addition.
   * @param value - The value to be added.
   * @returns The resulting date after the addition.
   */
  public timeAddition(
    date: Date,
    unitTime: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds',
    value: number,
  ): Date {
    try {
      return this.momentService(date).add(value, unitTime).toDate();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
