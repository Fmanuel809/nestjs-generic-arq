import { AppMimeTypes } from '../constants';

/**
 * Type for the MIME type of a file.
 * @example
 * ```ts
 * const mimeType: AppMimeType = 'image/png';
 * ```
 */
export type AppMimeType = (typeof AppMimeTypes)[number];
