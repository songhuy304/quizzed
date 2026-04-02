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

export class PaginatedResponseDto<T> implements IApiPaginated<T> {
  @Expose()
  @IsBoolean()
  success: boolean;

  @Expose()
  @IsString()
  message: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @Expose()
  data: T[];

  @Expose()
  @ValidateNested()
  @Type(() => PaginationMetadataDto)
  meta: PaginationMetadataDto;
}
