import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';
import { Comments } from './comments.schema';

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: UserDTO;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] })
  comments?: Comments[];
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const postSchema = SchemaFactory.createForClass(Post);
