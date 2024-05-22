import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    content: string;
    @Prop({ required: true })
    userId: string;
    @Prop({ required: true })
    comments: string[];
    @Prop()
    createdAt: Date;
}

export const postSchema = SchemaFactory.createForClass(Post);