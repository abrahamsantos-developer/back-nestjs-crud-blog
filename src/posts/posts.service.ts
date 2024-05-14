import { Injectable, NotFoundException, } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async getAllPosts() {
    try {
      return await this.postsRepository.findAllPosts();
    } catch (error) {
      throw new NotFoundException('Error buscando todos los posts');
    }
  }
  
  async getPostsByAuthor(username: string) {
    try {
      return await this.postsRepository.findPostsByAuthor(username);
    } catch (error) {
      throw new NotFoundException('Error buscando posts por autor');
    }
  }

  async getPostsByTitle(title: string) {
    try {
      return await this.postsRepository.findPostsByTitle(title);
    } catch (error) {
      throw new NotFoundException('Error buscando posts por titulo');
    }
  }

  async getPostsByContent(content: string) {
    try {
      return await this.postsRepository.findPostsByContent(content);
    } catch (error) {
      throw new NotFoundException('Error buscando posts por contenido');
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.postsRepository.getPostById(id);
      if (!post) {
        throw new NotFoundException(`Post no encontrado`);
      }
      return post;
    } catch (error) {
      throw new NotFoundException('Error encontrando post');
    }
  }

  async createPost(createPostDto: CreatePostDto) {
    try {
      const { username, title, content } = createPostDto;
      let user = await this.postsRepository.findUserByUsername(username);
      if (!user) {
        user = await this.postsRepository.createUser(username);
      }
      return await this.postsRepository.createPost(title, content, user);
    } catch (error) {
      throw new NotFoundException('Error creando post');
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.getPostById(id);
      return await this.postsRepository.updatePost(post, updatePostDto);
    } catch (error) {
      throw new NotFoundException('Error actualizando post');
    }
  }

  async deletePost(id: string) {
    try {
      const result = await this.postsRepository.deletePost(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Post no encontrado`);
      }
    } catch (error) {
      throw new NotFoundException('Error borrando post');
    }
  }
}
