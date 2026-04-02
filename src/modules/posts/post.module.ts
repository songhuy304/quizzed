import { Module } from '@nestjs/common';
import { PostPublicController } from './controllers/posts.public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/modules/posts/entities/post.entity';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostPublicController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
