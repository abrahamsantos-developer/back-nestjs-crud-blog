//se encarga de la DB
//implementamos el repository como un servicio.
//metodo anterior deprecado

import { Repository, ILike, DeleteResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
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

  findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findPostsByAuthor(username: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { username: ILike(`%${username}%`) }
    });
  }

  findPostsByTitle(title: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { title: ILike(`%${title}%`) }
    });
  }

  findPostsByContent(contentKeywords: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { content: ILike(`%${contentKeywords}%`) }
    });
  }

  getPostById(id: string): Promise<Post | undefined> {
    return this.postsRepository.findOneBy({ id });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(username: string): Promise<User> {
    const newUser = this.usersRepository.create({ username });
    return this.usersRepository.save(newUser);
  }

  createPost(title: string, content: string, user: User): Promise<Post> {
    const newPost = this.postsRepository.create({
      title,
      content,
      username: user.username,
      author: user
    });
    return this.postsRepository.save(newPost);
  }

  async updatePost(post: Post, updateData: UpdatePostDto): Promise<Post> {
    Object.assign(post, updateData);
    return this.postsRepository.save(post);
  }

  deletePost(id: string): Promise<DeleteResult> {
    return this.postsRepository.delete(id);
  }
}
