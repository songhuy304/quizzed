import { Module } from '@nestjs/common';
import { PostPublicController } from './controllers/posts.public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/modules/posts/entities/post.entity';
import { PostService } from './services/post.service';
import { HelperModule } from '@/common/helper/helper.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), HelperModule],
  controllers: [PostPublicController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
