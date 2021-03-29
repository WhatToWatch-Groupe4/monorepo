import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { KeycloakTokenParsed, User } from '../auth/req-user.decorator';
import { WishListService } from './wishlist.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WishList } from './wishlist.entity';
import { WishListDto } from './wishlist.dto';

@Controller('wishlist')
export class WishListController {
  constructor(private readonly wishlistService: WishListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getWishList(@User() user: KeycloakTokenParsed): Promise<WishList[]> {
    return await this.wishlistService.getWishList(user.sub);
  }

  @Get(':movie')
  @UseGuards(JwtAuthGuard)
  async checkWish(@Param('movie') movie: string, @User() user: KeycloakTokenParsed): Promise<WishList | undefined> {
    return await this.wishlistService.checkWish(user.sub, +movie);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createWishList(@Body() createWishList: WishListDto, @User() user: KeycloakTokenParsed): Promise<WishList> {
    return await this.wishlistService.insertWishList(user.sub, createWishList.movieId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeWishList(@Param('id') movie: string, @User() user: KeycloakTokenParsed): Promise<void> {
    void (await this.wishlistService.deleteWishList(user.sub, +movie));
  }
}
