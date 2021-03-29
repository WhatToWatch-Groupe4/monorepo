import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ViewsService } from './views.service';
import { View } from './views.entity';
import { ViewDto } from './view.dto';
import { KeycloakTokenParsed, User } from '../auth/req-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@User() user: KeycloakTokenParsed): Promise<View[]> {
    return await this.viewsService.findAll(user.sub);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') movie: number, @User() user: KeycloakTokenParsed): Promise<View> {
    const view = await this.viewsService.findOne(user.sub, movie);

    if (view === undefined) {
      throw new NotFoundException();
    }

    return view;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() viewDto: ViewDto, @User() user: KeycloakTokenParsed): Promise<View> {
    return await this.viewsService.create(user.sub, viewDto.movie);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @User() user: KeycloakTokenParsed): Promise<void> {
    await this.viewsService.delete(user.sub, id);
  }
}
