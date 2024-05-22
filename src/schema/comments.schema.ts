import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comments {
    @Prop({ required: true })
    comment: string;
    @Prop({ required: true })
    postId: string;
    @Prop({ required: true })
    userId: string;
    @Prop()
    createdAt: Date;
}

export const commentSchema = SchemaFactory.createForClass(Comments);
