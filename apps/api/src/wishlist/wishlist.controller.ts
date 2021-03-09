import { WishListService } from './wishlist.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishList } from './wishlist.entity';
import { WishListDto } from './wishlist.dto';

@Controller('wishlist')
export class WishListController {
  constructor(private readonly wishlistService: WishListService) {}

  @Get(':user')
  async getWishList(@Param('user') user: string): Promise<WishList[]> {
    return await this.wishlistService.getWishList(user);
  }

  @Get(':user/:movie')
  async checkWish(@Param('user') user: string, @Param('movie') movie: string): Promise<WishList | undefined> {
    return await this.wishlistService.checkWish(user, +movie);
  }

  @Post()
  async createWishList(@Body() createWishList: WishListDto): Promise<WishList> {
    return await this.wishlistService.insertWishList(createWishList.userId, createWishList.movieId);
  }

  @Delete(':user/:movie')
  async removeWishList(@Param('user') user: string, @Param('movie') movie: string): Promise<void> {
    void (await this.wishlistService.deleteWishList(user, +movie));
  }
}
