import { PaginationRequestDto } from '@/common/request/dtos/pagination.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PostGetDto extends PaginationRequestDto {
  @ApiProperty({
    example: 'search',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  search?: string;
}
