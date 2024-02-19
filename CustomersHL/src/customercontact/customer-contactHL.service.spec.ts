import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactServiceHL } from './customer-contactHL.service';
import { HttpService } from '@nestjs/axios';
import { ClsService } from 'nestjs-cls';
import { AppConfig } from '../config/AppConfig';
import axios from 'axios';

jest.mock('axios');
jest.mock('node-fetch');

const mockCustomerContactsRepo = {
  contact_id: '3936b6c4-3c62-454e-939c-1d638afb6c75',
  customer_id: '10101',
  customer_address_id: '102222',
  first_name:'sashamm',
  middle_name: "ram",
  last_name: "mango",
  title:"mr",
  email_address: "sham.mangor@example.com",
  phone_number:'+294782947',
  phone_number_extn:"+44",
  fax_number:"+235235",
  primary_flg:true,
  authorized_signatory_flg:true,
  electronic_signature_flg:false,
  designation:"Manager",
  contact_status:"Inactive",
  active_start_date:'2022-12-15',
  active_end_date:"2023-12-31",
  preferred_contact_method:"Phone",
  additional_contact_info:{
    key1:"value1",
    key2:"value2",
  },
  create_date:"2023-02-14T18:30:00.000Z",
  created_by:"Manager",
  last_update_date:"2023-02-19T18:30:00.000Z",
  last_updated_by:"Manager"
};

describe('CustomerContactServiceHL', () => {
  let service: CustomerContactServiceHL;
  let hhtpserv:HttpService;

  const mockClsService = {
    getId: jest.fn(),
  };

  const mockAppConfig = {
    DAL_URL:'https://example.com/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerContactServiceHL,
                  HttpService,
                {
                  provide: ClsService, useValue: mockClsService ,
                },
                {
                  provide: 'APP_CONFIG', useValue: AppConfig,
                },
                {
                  provide: HttpService,
                  useValue: {
                  get: jest.fn(),
                  },
                }],
    }).compile();

    service = module.get<CustomerContactServiceHL>(CustomerContactServiceHL);
    hhtpserv = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('GetallCustomer',()=>{
    it('Should return all the customer contacts',async ()=>{
      jest.spyOn(axios, 'get').mockResolvedValue({ data: mockCustomerContactsRepo });
      const result = await service.getCustomerCustomers();
      expect(result).toEqual(mockCustomerContactsRepo);
    })
  })
});
