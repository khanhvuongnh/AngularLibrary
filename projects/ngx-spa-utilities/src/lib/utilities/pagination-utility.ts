export interface Pagination {
  totalCount: number;
  totalPage: number;
  pageNumber: number;
  pageSize: number;
  skip: number;
  isPaging: boolean;
}

export interface PaginationParam {
  pageNumber: number;
  pageSize: number;
  isPaging: boolean;
}

export class PaginationResult<T> {
  result: T[] = [];
  pagination: Pagination = <Pagination>{};
}