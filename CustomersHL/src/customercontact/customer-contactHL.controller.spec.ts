import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactControllerHL } from './customer-contactHL.controller';
import { CustomerContactServiceHL } from './customer-contactHL.service';
import { ClsService } from 'nestjs-cls';
import { HttpService } from '@nestjs/axios';

const mockAppConfig = {
  DAL_URL:'https://example.com/',
}; 

const mockClsService: Partial<ClsService> = {
  getId: () => 'mocked-id',
};

describe('CustomerContactControllerHL', () => {
  let controllerhl : CustomerContactControllerHL;
  let servicehl : CustomerContactServiceHL;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerContactControllerHL],
      providers: [CustomerContactServiceHL,
        { provide: 'APP_CONFIG', useValue: mockAppConfig },
          {
            provide: ClsService,
            useValue: mockClsService,
          },
          {
            provide: HttpService,
            useValue: {
              get: jest.fn(),
            },
          }],
    }).compile();

    controllerhl = module.get<CustomerContactControllerHL>(CustomerContactControllerHL);
    servicehl = module.get<CustomerContactServiceHL>(CustomerContactServiceHL);
  });

  it('should be defined', () => {
    expect(controllerhl).toBeDefined();
  });

  it('should be defined', () => {
    expect(servicehl).toBeDefined();
  });
});
