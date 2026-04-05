import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationRequestDto {
  @ApiProperty({
    example: 10,
    required: true,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @ApiProperty({
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  page: number;
}
