import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private /*readonly*/ postsRepository: PostsRepository) {}

  getAllPosts() {
    return this.postsRepository.findAllPosts();
  }
  
  //se implementara despues
  // getPostsByAuthorId(authorId: string) {
  //   return this.postsRepository.findPostsByAuthorId(authorId);
  // }

  getPostsByAuthor(username: string) {
    return this.postsRepository.findPostsByAuthor(username);
}

  getPostsByTitle(title: string) {
    return this.postsRepository.findPostsByTitle(title);
  }

  getPostsByContent(content: string) {
    return this.postsRepository.findPostsByContent(content);
  }

  getPostById(id: string) {
    return this.postsRepository.getPostById(id);
  }

  createPost(createPostDto: CreatePostDto) {
    return this.postsRepository.createPost(createPostDto);
  }

  updatePost(id: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository.updatePost(id, updatePostDto);
  }

  deletePost(id: string) {
    return this.postsRepository.deletePost(id);
  }
}