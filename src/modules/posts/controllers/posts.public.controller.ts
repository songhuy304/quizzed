import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class PostPublicController {
  @Get('/')
  public getPost() {
    return { message: 'hello' };
  }
}
