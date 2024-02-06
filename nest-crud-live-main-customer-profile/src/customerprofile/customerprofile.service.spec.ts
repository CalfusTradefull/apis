import { Test, TestingModule } from '@nestjs/testing';
import { CustomerprofileService } from './customerprofile.service';

describe('CustomerprofileService', () => {
  let service: CustomerprofileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerprofileService],
    }).compile();

    service = module.get<CustomerprofileService>(CustomerprofileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
