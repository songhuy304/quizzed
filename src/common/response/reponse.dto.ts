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

  constructor(message: string, success: boolean) {
    this.success = success;
    this.message = message;
  }

  static success(message: string = 'success'): ApiGenericResponseDto {
    return new ApiGenericResponseDto(message, true);
  }

  static error(message: string = 'error'): ApiGenericResponseDto {
    return new ApiGenericResponseDto(message, false);
  }
}

export class ApiResponseDto<T> extends ApiGenericResponseDto {
  @Expose()
  data: T | null;

  constructor(data: T | null, message: string, success: boolean) {
    super(message, success);
    this.data = data;
  }

  static success<T>(data: T, message: string = 'success'): ApiResponseDto<T> {
    return new ApiResponseDto<T>(data, message, true);
  }

  static error<T>(
    message: string = 'error',
    data: T | null = null,
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(data, message, false);
  }
}
