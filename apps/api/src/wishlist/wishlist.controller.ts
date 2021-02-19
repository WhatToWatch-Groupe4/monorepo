import { WishListService } from './wishlist.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishList } from './wishlist.entity';
import { WishListDto } from './wishlist.dto';

@Controller('wishlist')
export class WishListController {
  constructor(private readonly wishlistService: WishListService) {}

  @Get(':user')
  async getWishList(@Param('user') user: string): Promise<WishList[]> {
    return this.wishlistService.getWishList(user);
  }

  @Get(':user/:movie')
  async checkWish(@Param('user') user: string, @Param('movie') movie: string): Promise<WishList> {
    return this.wishlistService.checkWish(user, +movie);
  }

  @Post()
  async createWishList(@Body() createWishList: WishListDto): Promise<WishList> {
    return this.wishlistService.insertWishList(createWishList.userId, createWishList.movieId);
  }

  @Delete()
  async removeWishList(@Body() wishListDelete: WishListDto): Promise<void> {
    void this.wishlistService.deleteWishList(wishListDelete.userId, wishListDelete.movieId);
  }
}
