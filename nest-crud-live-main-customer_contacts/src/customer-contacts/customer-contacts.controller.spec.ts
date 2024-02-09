import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactsController } from './customer-contacts.controller';

describe('CustomerContactsController', () => {
  let controller: CustomerContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerContactsController],
    }).compile();

    controller = module.get<CustomerContactsController>(CustomerContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
