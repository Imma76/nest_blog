import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CommentsDTO } from './comments.dto';
import { UserDTO } from './user.dto';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsOptional()
  @ValidateNested()
  @IsArray()
  comments: CommentsDTO[];
  @Type(() => UserDTO)
  user?: UserDTO;
}

export class PostDTO {

  title: string;

  content: string;
  id: string;


}
