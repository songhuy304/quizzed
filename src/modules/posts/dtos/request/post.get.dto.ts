import { PaginationRequestDto } from '@/common/request/dtos/pagination.request.dto';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PostGetDto extends PaginationRequestDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  search?: string;
}
