import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDTO } from 'src/dto/post.dto';
import { PostGuard } from 'src/post/guards/post/post.guard';
import { PostService } from 'src/post/service/post/post.service';

@Controller('post')
@UseGuards(PostGuard)
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPost(@Body() postDto: CreatePostDTO) {
        const newPost = await this.postService.createPost(postDto);
        return newPost;
    }
}
