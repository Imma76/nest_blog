import { IsNotEmpty, IsString } from 'class-validator';

export class PostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
