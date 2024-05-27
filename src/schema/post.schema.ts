import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    content: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', })
    user?: UserDTO;
    @Prop({ required: true })
    comments: string[];
    @Prop({ default: Date.now })
    createdAt: Date;

}

export const postSchema = SchemaFactory.createForClass(Post);