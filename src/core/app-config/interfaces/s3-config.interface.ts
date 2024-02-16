/**
 * Interface for S3 configuration
 */
export interface IS3Config {
  /**
   * S3 endpoint
   * @example 'localhost'
   */
  endPoint: string;

  /**
   * S3 port
   * @example 9000
   */
  port: number;

  /**
   * Use SSL
   * @example true
   */
  useSSL: boolean;

  /**
   * S3 access key
   * @example 'minio'
   */
  accessKey: string;

  /**
   * S3 secret key
   * @example 'minio123'
   */
  secretKey: string;

  /**
   * S3 Bucket object retention
   * If true, the bucket will be locked and objects can't be deleted, overwritten or modified,
   * All objects will be protected from deletion until the retention period has passed,
   * and versioning on modified objects or overwrites will be enabled.
   */
  objectLocking: boolean;

  /**
   * S3 Bucket object retention period in years
   * @example 10
   */
  retentionPeriod: number;
}
