import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentGuard } from 'src/comments/guard/comment/comment.guard';
import { CommentService } from 'src/comments/services/comment/comment.service';
import { CommentsDTO } from 'src/dto/comments.dto';

@Controller('comment')
@UseGuards(CommentGuard)
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post('')
    async postComment(@Body() commentDto: CommentsDTO) {
        const comment = await this.commentService.postComment(commentDto);
        return comment;
    }
    @Get('')
    async getComment() {
        const comments = await this.commentService.getComment();
        return comments;
    }
}
