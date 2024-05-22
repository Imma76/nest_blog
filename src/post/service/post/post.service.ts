import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from 'src/dto/post.dto';
import { PostGuard } from 'src/post/guards/post/post.guard';
import { Post } from 'src/schema/post.schema';

@Injectable()
@UseGuards(PostGuard)
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) { }

    async createPost(postDto: CreatePostDTO) {
        const newPost = await this.postModel.create(postDto);
        return newPost;
    }
}
