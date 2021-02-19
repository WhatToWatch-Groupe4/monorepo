import { WishListService } from './wishlist.service';
import { WishListController } from './wishlist.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WishList])],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule {}
