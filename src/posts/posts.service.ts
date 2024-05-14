import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

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

  // updatePost(id: string, updatePostDto: UpdatePostDto) {
  //   return this.postsRepository.updatePost(id, updatePostDto);
  // }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      console.log(`Updating post with ID ${id}`);
      const updatedPost = await this.postsRepository.updatePost(id, updatePostDto);
      if (!updatedPost) {
        console.error(`Failed to find or update the post with ID ${id}`);
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }
      console.log(`Post updated successfully: ${updatedPost}`);
      return updatedPost;
    } catch (error) {
      console.error(`Error updating post with ID ${id}: ${error.message}`);
      throw error;  // Re-throw to let the error be handled further up the stack
    }
  }
  

  deletePost(id: string) {
    return this.postsRepository.deletePost(id);
  }
}