import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentController } from './comments/controllers/comment/comment.controller';
import { CommentService } from './comments/services/comment/comment.service';
import { PostController } from './post/controllers/post/post.controller';
import { PostService } from './post/service/post/post.service';
import { Comments, commentSchema } from './schema/comments.schema';
import { Post, postSchema } from './schema/post.schema';
import { User, userSchema } from './schema/user.schema';
import { UsersController } from './user/controllers/users/users.controller';
import { UsersService } from './user/services/users/users.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Emma:SpC9Qvv4luueqBPY@cluster0.kx41p.mongodb.net/nest_blog?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema }, { name: Post.name, schema: postSchema }, { name: Comments.name, schema: commentSchema }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.salt,
      privateKey: process.env.privateKey,
      signOptions: { expiresIn: '10' },
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    PostController,
    CommentController,
  ],
  providers: [AppService, CommentService, UsersService, PostService, JwtService],
})
export class AppModule { }
