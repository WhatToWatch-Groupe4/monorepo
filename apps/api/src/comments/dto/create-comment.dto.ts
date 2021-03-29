import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly message!: string;

  @IsNumber()
  movieId: number;
}
