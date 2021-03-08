import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  create(createCommentDto: CreateCommentDto): Comment {
    throw new NotImplementedException({ createCommentDto });
  }

  findAll(movieId: number): Promise<Comment[]> {
    return this.commentRepository.find({ movieId });
  }

  findOne(id: number): Comment {
    throw new NotImplementedException({ id });
  }

  update(id: number, updateCommentDto: UpdateCommentDto): Comment {
    throw new NotImplementedException({ id, updateCommentDto });
  }

  remove(id: number): void {
    throw new NotImplementedException({ id });
  }
}
