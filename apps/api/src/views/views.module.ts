import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from './views.entity';

@Module({
  imports: [TypeOrmModule.forFeature([View])],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
