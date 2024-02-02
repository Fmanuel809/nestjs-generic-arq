export interface IResponse<T = undefined> {
  data?: T;
  message: string;
  statusCode: number;
  meta?: MetaData;
}

export interface MetaData {
  currentPage?: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
