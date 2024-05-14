
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty({ example: 'Mi primer post', description: 'Titulo del post nuevo', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50) 
  title: string;

  @ApiProperty({ example: 'Esto es el contenido del post para el blog...', description: 'El contenido del post', maxLength: 450 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 450) 
  content: string;

  @ApiProperty({ example: 'Abraham Santos', description: 'Nombre del autor del post' })  
  @IsNotEmpty()
  @IsString()
  username: string; 
}

