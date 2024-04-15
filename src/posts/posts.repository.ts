//se encarga de la DB
//implementamos el repository como un servicio. 
//metodo anterior deprecado
import { Repository, Like } from 'typeorm';
import { Post } from './entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findPostsByAuthor(authorId: string): Promise<Post[]> {
    return this.postsRepository.find({ where: { author: { id: authorId } } });
  }

  async findPostsByTitle(title: string): Promise<Post[]> {
    return this.postsRepository.find({ where: { title: title } });
  }

  async findPostsByContent(contentKeywords: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { content: Like(`%${contentKeywords}%`) } 
    });
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    await this.postsRepository.save(post);
    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    Object.assign(post, updatePostDto);
    await this.postsRepository.save(post);
    return post;
  }

  async deletePost(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
  }
}