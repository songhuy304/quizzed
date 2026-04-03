import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationRequestDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  page: number;
}
