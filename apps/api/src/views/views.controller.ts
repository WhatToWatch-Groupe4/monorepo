import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ViewsService } from './views.service';
import { View } from './views.entity';
import { DeleteResult } from 'typeorm';
import { ViewDto } from './view.dto';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  // TODO Query user_uuid à supprimer et à récupérer depuis l'api
  @Get()
  async findAll(@Param('user') user: string): Promise<View[]> {
    return await this.viewsService.findAll(user);
  }

  // TODO Param ser_uuid à supprimer et à récupérer depuis l'api
  @Get(':movie')
  async findOne(@Param('movie') movie: number, @Query('user_uuid') user_uuid: string): Promise<View | undefined> {
    return await this.viewsService.findOne(user_uuid, movie);
  }

  @Post()
  async create(@Body() viewDto: ViewDto): Promise<View> {
    return await this.viewsService.create(viewDto.user_uuid, viewDto.movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.viewsService.delete(id);
  }
}
