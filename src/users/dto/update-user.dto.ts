import { IsEmail, IsOptional, IsString } from 'class-validator';

//esto se va a usar para implementar mas adelante con el signup
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}