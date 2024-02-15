import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPreferencesController } from './customer-preferences.controller';

describe('CustomerPreferencesController', () => {
  let controller: CustomerPreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerPreferencesController],
    }).compile();

    controller = module.get<CustomerPreferencesController>(
      CustomerPreferencesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
