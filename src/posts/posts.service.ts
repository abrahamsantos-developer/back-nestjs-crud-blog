import { Injectable, NotFoundException, } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async getAllPosts() {
    return await this.postsRepository.findAllPosts();
  }
  
  async getPostsByAuthor(username: string) {
    return await this.postsRepository.findPostsByAuthor(username);
  }

  async getPostsByTitle(title: string) {
    return await this.postsRepository.findPostsByTitle(title);
  }

  async getPostsByContent(content: string) {
    return await this.postsRepository.findPostsByContent(content);
  }

  async getPostById(id: string) {
    const post = await this.postsRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Post no encontrado`);
    }
    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    const { username, title, content } = createPostDto;
    let user = await this.postsRepository.findUserByUsername(username);
    if (!user) {
      user = await this.postsRepository.createUser(username);
    }
    return await this.postsRepository.createPost(title, content, user);
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.getPostById(id);
    return await this.postsRepository.updatePost(post, updatePostDto);
  }

  async deletePost(id: string) {
    const result = await this.postsRepository.deletePost(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post no encontrado`);
    }
  }
}
