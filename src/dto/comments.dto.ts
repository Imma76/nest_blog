import { IsNotEmpty, IsString } from 'class-validator';

export class CommentsDTO {
  @IsNotEmpty()
  @IsString()
  comment: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  postId: string;
}
