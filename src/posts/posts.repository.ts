//se encarga de la DB
//implementamos el repository como un servicio.
//metodo anterior deprecado

import { Repository, Like } from 'typeorm';
import { Post } from './entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  //se implememntara luego
  // async findPostsByAuthorId(authorId: string): Promise<Post[]> {
  //   return this.postsRepository.find({ where: { author: { id: authorId } } });
  // }

// async findPostsByAuthor(username: string): Promise<Post[]> {
//   return this.postsRepository.find({
//       where: { author: { username: username } },
//       relations: ["author"]  
//   });
// }

//esto debe refactorarse. username debe ser author y usernamme se quedara en tabla users.
async findPostsByAuthor(username: string): Promise<Post[]> {
  return this.postsRepository.find({ where: { username } });
}

  async findPostsByTitle(title: string): Promise<Post[]> {
    return this.postsRepository.find({ where: { title: title } });
  }

  async findPostsByContent(contentKeywords: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { content: Like(`%${contentKeywords}%`) },
    });
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }
  // esto guardaba el username en la tabla user.
  // async createPost(createPostDto: CreatePostDto): Promise<Post> {
  //   const { username, title, content } = createPostDto;

  //   let user = await this.usersRepository.findOne({ where: { username } });
  //   if (!user) {
  //     user = this.usersRepository.create({ username });
  //     await this.usersRepository.save(user);
  //   }

  //   const newPost = this.postsRepository.create({
  //     title,
  //     content,
  //     author: user,
  //   });
  //   await this.postsRepository.save(newPost);
  //   return newPost;
  // }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { username, title, content } = createPostDto;
  
    // Verifica si el usuario ya existe
    let user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      // Si no existe, crea un nuevo usuario
      user = this.usersRepository.create({ username });
      await this.usersRepository.save(user);
    }
  
    // Crea el post con el username directamente en el post
    const newPost = this.postsRepository.create({
      title,
      content,
      username, // Se asigna el username directamente al post
      author: user // Se asigna el usuario encontrado o creado como autor del post
    });
  
    await this.postsRepository.save(newPost);
    return newPost;
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
