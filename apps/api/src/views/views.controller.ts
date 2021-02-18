import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ViewsService } from './views.service';
import { AxiosError } from 'axios';
import { Request } from 'express';
import { View } from './views.entity';
import { DeleteResult } from 'typeorm';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get(':uid')
  async findAll(@Param('uid') uid: string): Promise<View[]> {
    try {
      return await this.viewsService.findAll(uid);
    } catch (e) {
      this.getAxiosError(e);
    }
  }

  @Get()
  async findOne(@Req() req: Request): Promise<boolean> {
    try {
      const uid = req.body.uid;
      const movie = req.body.movie;
      return !!(await this.viewsService.findOne(uid, movie));
    } catch (e) {
      this.getAxiosError(e);
    }
  }

  @Post()
  async create(@Req() req: Request): Promise<View> {
    try {
      const uid = req.body.uid;
      const movie = req.body.movie;
      return await this.viewsService.create(uid, movie);
    } catch (e) {
      this.getAxiosError(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    try {
      return await this.viewsService.delete(id);
    } catch (e) {
      this.getAxiosError(e);
    }
  }

  getAxiosError(e: any): void {
    const err = e as AxiosError;
    if (err.response.status === 404) {
      throw new NotFoundException(err.response.data.status_message);
    }
    throw new InternalServerErrorException(e);
  }
}
