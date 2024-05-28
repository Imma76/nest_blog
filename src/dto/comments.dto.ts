import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostDTO } from './post.dto';
import { UserDTO } from './user.dto';

export class CommentsDTO {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @Type(() => UserDTO)
  user: UserDTO;
  @Type(() => PostDTO)
  post: PostDTO;
}
