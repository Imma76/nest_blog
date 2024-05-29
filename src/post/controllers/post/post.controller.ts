import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDTO } from 'src/dto/post.dto';
import { PostGuard } from 'src/post/guards/post/post.guard';
import { PostService } from 'src/post/service/post/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) { }

  @Post()
  @UseGuards(PostGuard)
  @UsePipes(new ValidationPipe())
  async createPost(@Body() postDto: CreatePostDTO) {
    const newPost = await this.postService.createPost(postDto);
    return newPost;
  }

  @Get('')
  async getPost() {
    const allPost = await this.postService.getPost();
    return { status: true, data: allPost };
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);

    if (!post) throw new NotFoundException('post not found');
    return { status: true, data: post };
  }
}
