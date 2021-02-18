import { WishListService } from './wishlist.service';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { WishList } from './wishlist.entity';
import { WishListDto } from './wishlist.dto';

@Controller('wishlist')
export class WishListController {
  constructor(private readonly wishlistService: WishListService) {}

  @Post()
  async createWishList(@Body() createWishList: WishListDto): Promise<WishList>{
    return this.wishlistService.insertWishList(createWishList.userId, createWishList.movieId);
  }

  @Delete()
  async removeWishList(@Body() wishListDelete: WishListDto){
    this.wishlistService.deleteWishList(wishListDelete.userId, wishListDelete.movieId);
  }
}
