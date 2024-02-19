import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactsService } from './customer-contacts.service';
import { CustomerContactsController } from './customer-contacts.controller';
import { Repository } from 'typeorm';
import { CustomerContacts } from './customer-contact.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

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


describe('CustomerContactsService', () => {

  const mockCustomerContactService: typeof mockCustomerContactsRepo = {
    findOne: jest.fn(),
    find: jest.fn().mockResolvedValue([]),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any;

  let controller: CustomerContactsController;
  let service : CustomerContactsService;
  let repositoryMock : MockType<Repository<CustomerContacts>>;

  beforeEach(async () => {

    //repositoryMock = createMock<Repository<CustomerContacts>>();

    const module: TestingModule = await Test.createTestingModule({
      controllers:[CustomerContactsController],
      providers: [
        CustomerContactsService,
        {
          provide: getRepositoryToken(CustomerContacts),
          useValue:mockCustomerContactService
        }
      ],
    }).compile();

    // function createMock<T>(): MockType<Repository<CustomerContacts>> {
    //   throw new Error('Function not implemented.');
    // }
    controller = module.get<CustomerContactsController>(CustomerContactsController);
    repositoryMock = module.get(getRepositoryToken(CustomerContacts ));
    service = module.get<CustomerContactsService>(CustomerContactsService)
  });

  
  it('Service should be Defined', async () => {
    expect(service).toBeDefined();
  });


  describe('findall',()=>{
    it('should return all customer preferences', async () => {

      const expectedresult :CustomerContacts[] = [
        mockCustomerContactsRepo,
      ];

      jest
        .spyOn(repositoryMock,'find')
        .mockResolvedValue(mockCustomerContactsRepo as never);
    });
  });


  describe('getById', () => {
    it('should return a customer contact by ID', async () => {
    jest
      .spyOn(repositoryMock, 'findOne')
        .mockImplementation(()=> mockCustomerContactsRepo);
      const result = await service.findOne(mockCustomerContactsRepo.contact_id);
      expect(result).toEqual(mockCustomerContactsRepo);
    });
  });

  describe('create', () => {
    it('should create a new customer contact', async () => {
      const newContact: CustomerContacts = mockCustomerContactsRepo;
      jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(mockCustomerContactsRepo as never);

      const result = await service.create(newContact);
      expect(result).toEqual(newContact);
      expect(repositoryMock.save).toHaveBeenLastCalledWith(mockCustomerContactsRepo);
    });

    describe('update', () => {
      it('should update a customer contact', async () => {
        const updatedData : Partial<CustomerContacts> = {
          fax_number:"+4739874",
          additional_contact_info:{
            key1:"radhe",
            key2:"sham"
          }
        };
        const id = "d9726b36-0458-4147-8f9a-8699a56943f7";
        jest.spyOn(repositoryMock, 'save').mockResolvedValue(mockCustomerContactsRepo as never);
        const result = await service.update(id, updatedData);
        console.log(`result is ${JSON.stringify(result)} \n\n\n`);
        console.log(`expected update is ${JSON.stringify(updatedData)}`);
        expect(result).toEqual(mockCustomerContactsRepo);
      });
    });


  });

});


