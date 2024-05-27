import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
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
  @Type(() => UserDTO)
  user?: UserDTO;
}
