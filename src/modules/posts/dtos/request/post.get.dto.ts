import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PostGetDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  page: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  search?: string;
}
