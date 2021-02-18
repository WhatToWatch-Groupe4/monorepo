import { MovieService } from './movies.service';
import { Controller, Get, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { AxiosError } from 'axios';
import { MovieResponse, TrendingResponse} from 'moviedb-promise/dist/request-types';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<MovieResponse> {
    try {
      return await this.movieService.movieDbService.api.movieInfo(id);
    } catch (e) {
      const err = e as AxiosError;
      if (err.response.status === 404) {
        throw new NotFoundException(err.response.data.status_message);
      }
      throw new InternalServerErrorException(e);
    }
  }
  @Get()
  async findAll(): Promise<TrendingResponse> {
    return this.movieService.findAll();
  }
}
