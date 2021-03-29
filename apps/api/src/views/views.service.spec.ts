import { Test, TestingModule } from '@nestjs/testing';
import { ViewsService } from './views.service';
import { View } from './views.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ViewsService', () => {
  let service: ViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewsService,
        {
          provide: getRepositoryToken(View),
          useValue: 'viewRepository',
        },
      ],
    }).compile();

    service = module.get<ViewsService>(ViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
