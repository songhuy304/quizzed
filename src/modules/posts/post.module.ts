import { Module } from '@nestjs/common';
import { PostPublicController } from './controllers/posts.public.controller';

@Module({
  imports: [],
  controllers: [PostPublicController],
  providers: [],
  exports: [],
})
export class PostModule {}
