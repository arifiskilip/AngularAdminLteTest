export interface PaginationInfo{
    pageIndex: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}