
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50) 
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 450) // Contenido debe tener entre 1 y 450
  content: string;

  @IsNotEmpty()
  @IsString()
  username: string; 
}

