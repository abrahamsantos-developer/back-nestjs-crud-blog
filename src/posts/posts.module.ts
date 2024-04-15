//esto es como un archivo dependencies.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';


//agregamos PostsRepository como un servicio

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository], 
})
export class PostsModule {}
