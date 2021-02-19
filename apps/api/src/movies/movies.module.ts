import { MovieService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesDbModule } from '../moviedb/moviedb.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MoviesDbModule],
  controllers: [MoviesController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MoviesModule {}
