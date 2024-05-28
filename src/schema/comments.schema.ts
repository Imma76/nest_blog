import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';
import { Post } from './post.schema';

@Schema()
export class Comments {
    @Prop({ required: true })
    comment: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    post: Post;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: UserDTO;
    @Prop()
    createdAt: Date;
}

export const commentSchema = SchemaFactory.createForClass(Comments);
