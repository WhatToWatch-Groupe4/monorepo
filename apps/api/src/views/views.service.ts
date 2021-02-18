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
  findAll(uid: string): Promise<View[]> {
    return this.viewRepository.find({ where: { uid } });
  }
  findOne(uid: string, movie: number): Promise<View> {
    return this.viewRepository.findOne({ where: { uid, movie } });
  }
  create(uid: string, movie: number): Promise<View> {
    const view = new View();
    view.uid = uid;
    view.movie = movie;
    return this.viewRepository.save(view);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.viewRepository.delete(id);
  }
}
