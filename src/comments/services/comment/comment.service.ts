import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsDTO } from 'src/dto/comments.dto';
import { Comments } from 'src/schema/comments.schema';
import { Post } from 'src/schema/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async postComment(commentDto: CommentsDTO) {
    const newComment = await this.commentModel.create({
      user: commentDto.user.id,

      post: commentDto.post.id,

      comment: commentDto.comment,
    });

    const post = await this.postModel.findByIdAndUpdate(
      { _id: commentDto.post.id },
      { $push: { comments: newComment._id } },
    );
    return newComment;
  }

  async getComment() {
    const comments = await this.commentModel
      .find({})
      .populate('user')
      .populate('post');
    return comments;
  }
}
