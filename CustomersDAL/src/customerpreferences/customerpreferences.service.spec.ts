import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPreferenceService } from './customer-preferences.service';

describe('CustomerPreferencesService', () => {
  let service: CustomerPreferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerPreferenceService],
    }).compile();

    service = module.get<CustomerPreferenceService>(CustomerPreferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
