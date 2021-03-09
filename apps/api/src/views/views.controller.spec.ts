import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ViewsController } from './views.controller';
import { View } from './views.entity';
import { ViewsService } from './views.service';

describe('ViewsController', () => {
  let controller: ViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewsService,
        {
          provide: getRepositoryToken(View),
          useValue: 'viewRepository',
        },
      ],
      controllers: [ViewsController],
    }).compile();

    controller = module.get<ViewsController>(ViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
