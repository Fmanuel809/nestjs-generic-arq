export interface IErrorResponse {
  message: string;
  title?: string;
  statusCode: number;
  trace?: Record<string, any>;
}
