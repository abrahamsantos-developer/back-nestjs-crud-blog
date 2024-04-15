
import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
  //puede ser implementado mas adelate, con auth y demas
  // @Get('author/:authorId')
  // getPostsByAuthorId(@Param('authorId') authorId: string) {
  //   return this.postsService.getPostsByAuthorId(authorId);
  // }

@Get('author/:username')  
getPostsByAuthor(@Param('username') username: string) {
    return this.postsService.getPostsByAuthor(username);
}


  @Get('title/:title')
  getPostsByTitle(@Param('title') title: string) {
    return this.postsService.getPostsByTitle(title);
  }

  @Get('content/:content')
  getPostsByContent(@Param('content') content: string) {
    return this.postsService.getPostsByContent(content);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post()
  //@UsePipes(new ValidationPipe({ transform: true }))
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  //@UsePipes(new ValidationPipe({ transform: true }))
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}