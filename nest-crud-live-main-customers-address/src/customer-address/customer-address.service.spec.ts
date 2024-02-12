import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressService } from './customer-address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { customer_address } from './customer-address.entity';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

describe('CustomerAddressService', () => {
  const repositoryMockfn = {
    findOne: jest.fn(),
    find: jest.fn().mockResolvedValue([]),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any;
  let service: CustomerAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerAddressService,
        {
          provide: getRepositoryToken(customer_address),
          useValue: repositoryMockfn,
        },
      ],
    }).compile();

    service = module.get<CustomerAddressService>(CustomerAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
