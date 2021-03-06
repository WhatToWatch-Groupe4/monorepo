import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { KeycloakTokenParsed, User } from '../auth/req-user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: KeycloakTokenParsed): Promise<Comment> {
    return this.commentsService.create(createCommentDto, user.sub, user.preferred_username);
  }

  @Get()
  async findAll(@Query() query: { movie_id: number }): Promise<Comment[]> {
    return await this.commentsService.findAll(query.movie_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: KeycloakTokenParsed) {
    if (user.groups.includes('admin')) {
      return this.commentsService.remove(+id);
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
