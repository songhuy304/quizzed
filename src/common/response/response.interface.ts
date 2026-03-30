export interface IApiBaseRes {
  code: number;
  message: string;
}

export interface IApiSuccessRes<T> extends IApiBaseRes {
  data: T;
}

export interface IPaginationMetadata {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IApiPaginated<T> extends IApiBaseRes {
  data: T[];
  metaData: IPaginationMetadata;
}
