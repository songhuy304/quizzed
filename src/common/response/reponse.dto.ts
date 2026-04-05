import { IApiBaseResponse } from '@/common/response/response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiGenericResponseDto implements IApiBaseResponse {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  @Expose()
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  @Expose()
  message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }

  static success(message: string): ApiGenericResponseDto {
    return new ApiGenericResponseDto(true, message);
  }

  static error(message: string): ApiGenericResponseDto {
    return new ApiGenericResponseDto(false, message);
  }
}

export class ApiResponseDto<T> extends ApiGenericResponseDto {
  @Expose()
  data: T | null;

  constructor(success: boolean, message: string, data: T | null = null) {
    super(success, message);
    this.data = data;
  }

  static success<T>(message: string, data?: T): ApiResponseDto<T> {
    return new ApiResponseDto<T>(true, message, data ?? null);
  }

  static error<T>(message: string): ApiResponseDto<T> {
    return new ApiResponseDto<T>(false, message, null);
  }
}
