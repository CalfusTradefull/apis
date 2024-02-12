import { Test, TestingModule } from '@nestjs/testing';
import { CustomerprofileController } from './customerprofile.controller';

describe('CustomerprofileController', () => {
  let controller: CustomerprofileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerprofileController],
    }).compile();

    controller = module.get<CustomerprofileController>(
      CustomerprofileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
