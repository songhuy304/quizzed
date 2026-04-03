import {
  IApiPaginated,
  IPaginationMetadata,
} from '@/common/response/response.interface';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PaginationMetadataDto implements IPaginationMetadata {
  @Expose()
  @IsNumber()
  currentPage: number;

  @Expose()
  @IsNumber()
  itemsPerPage: number;

  @Expose()
  @IsNumber()
  totalItems: number;

  @Expose()
  @IsNumber()
  totalPages: number;
}

export class PaginatedDto<T> {
  @IsArray()
  @ValidateNested({ each: true })
  @Expose()
  data: T[];

  @Expose()
  @ValidateNested()
  @Type(() => PaginationMetadataDto)
  meta: PaginationMetadataDto;
}

export class PaginatedResponseDto<T>
  extends PaginatedDto<T>
  implements IApiPaginated<T>
{
  @IsBoolean()
  @Expose()
  success: boolean;

  @Expose()
  @IsString()
  message: string;

  constructor(
    data: T[],
    meta: PaginationMetadataDto,
    message: string,
    success: boolean,
  ) {
    super();
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  static success<T>(
    data: T[],
    meta: PaginationMetadataDto,
    message: string = 'success!',
  ): PaginatedResponseDto<T> {
    return new PaginatedResponseDto<T>(data, meta, message, true);
  }

  static error<T>(
    message: string = 'error!',
    data: T[] = [],
    meta?: PaginationMetadataDto,
  ): PaginatedResponseDto<T> {
    const defaultMeta: PaginationMetadataDto = meta || {
      currentPage: 0,
      itemsPerPage: 0,
      totalItems: 0,
      totalPages: 0,
    };
    return new PaginatedResponseDto<T>(data, defaultMeta, message, false);
  }
}
