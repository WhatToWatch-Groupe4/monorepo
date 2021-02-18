import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { View } from './views.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(View)
    private viewRepository: Repository<View>,
  ) {}
  findAll(user_uuid: string): Promise<View[]> {
    return this.viewRepository.find({ where: { user_uuid } });
  }
  findOne(user_uuid: string, movie: number): Promise<View> {
    return this.viewRepository.findOne({ where: { user_uuid, movie } });
  }
  create(user_uuid: string, movie: number): Promise<View> {
    const view = new View();
    view.user_uuid = user_uuid;
    view.movie = movie;
    return this.viewRepository.save(view);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.viewRepository.delete(id);
  }
}
