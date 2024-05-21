import { PaginationInfo } from "./paginationInfo";

export interface Paginate<T>{
    items:T;
    pagination:PaginationInfo
}