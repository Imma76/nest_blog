import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from 'src/dto/post.dto';
import { PostGuard } from 'src/post/guards/post/post.guard';
import { Post } from 'src/schema/post.schema';

@Injectable()
@UseGuards(PostGuard)
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost({ user, ...postDto }: CreatePostDTO) {
    const newPost = await this.postModel.create({
      title: postDto.title,
      content: postDto.content,
      user: user.id,
    });
    return newPost;
  }
  async getPost() {
    const allPost = await this.postModel.find({});
    return allPost;
  }
  async getPostById(id: string) {
    const allPost = await this.postModel.findById(id);
    return allPost;
  }
}
