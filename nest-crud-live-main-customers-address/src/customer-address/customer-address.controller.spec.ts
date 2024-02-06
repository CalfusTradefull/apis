import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressController } from './customer-address.controller';

describe('CustomerAddressController', () => {
  let controller: CustomerAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAddressController],
    }).compile();

    controller = module.get<CustomerAddressController>(CustomerAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
