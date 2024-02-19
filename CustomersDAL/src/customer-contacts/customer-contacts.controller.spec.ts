import { Repository } from 'typeorm';
import {  Test, TestingModule } from '@nestjs/testing';
import { CustomerContactsController } from './customer-contacts.controller';
import { CustomerContactsService } from './customer-contacts.service';
import { MockType } from './customer-contacts.service.spec';
import { CustomerContacts } from './customer-contact.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';


const repositoryMock = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => dto),
  find: jest.fn().mockImplementation(() => []),
  findOneOrFail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
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

describe('CustomerContactsController', () => {
  let controller: CustomerContactsController;
  let service : CustomerContactsService;
  let repositoryMock : MockType<Repository<CustomerContacts>>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerContactsController],
      providers:[
        CustomerContactsService,
        {
          provide: getRepositoryToken(CustomerContacts),
          useValue:repositoryMock,
        },
      ]
    }).compile();

    controller = await module.get<CustomerContactsController>(CustomerContactsController);
    repositoryMock = await module.get(getRepositoryToken(CustomerContacts ));
    service = await module.get<CustomerContactsService>(CustomerContactsService)
  });


  it('Controller Customer-Contact controller must be defined',()=>{
    expect(controller).toBeDefined();
  });
  it('Service Customer-Contact service must be defined',async ()=>{
    expect(service).toBeDefined();
  });


  describe('findall',()=>{
    it('should return all customer preferences', async () => {
      const mockCustomerContacts: CustomerContacts[] = [
        mockCustomerContactsRepo,
        mockCustomerContactsRepo,
      ];
      jest.spyOn(service, 'findall').mockResolvedValue(mockCustomerContacts);
      const result = await controller.findall();
      expect(result).toEqual(mockCustomerContacts);
      expect(service.findall).toHaveBeenCalled();
    });
  });

  describe('findOne',()=>{
    const mockCustomerContactsExpected: CustomerContacts = mockCustomerContactsRepo;

    it('should return user according to id',async ()=>{
      jest
      .spyOn(service,'findOne').mockResolvedValueOnce(mockCustomerContactsExpected);

      const expectedresult = await controller.findOne(mockCustomerContactsExpected.contact_id);
       console.log(expectedresult);
      expect(expectedresult).toEqual(mockCustomerContactsExpected);
      expect(service.findOne).toHaveBeenCalledWith(mockCustomerContactsExpected.contact_id);
    });
  });

  describe('create',()=>{
    it('It should create a new customer Contact', async ()=>{
      const mockCustomerContacts : CustomerContacts = mockCustomerContactsRepo;
      jest
        .spyOn(service,'create')
        .mockResolvedValueOnce(mockCustomerContacts)
        const result = await controller.create(mockCustomerContacts);
        expect(result).toEqual(mockCustomerContacts);
    });

    it('should handle validation errors may return 400 status code', async () => {
      const mockCustomerContacts : CustomerContacts = mockCustomerContactsRepo;
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Validation failed'));
      await expect(controller.create(mockCustomerContacts)).rejects.toThrow('Validation failed');
    });

    it('should handle database errors', async () => {
      const mockCustomerContacts : CustomerContacts = mockCustomerContactsRepo;
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Database error'));
      await expect(controller.create(mockCustomerContacts)).rejects.toThrow('Database error');
    });
  
    it('should handle authorization errors', async () => {
      const mockCustomerContacts : CustomerContacts = mockCustomerContactsRepo;
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Unauthorized'));
      await expect(controller.create(mockCustomerContacts)).rejects.toThrow('Unauthorized');
    });
  
    it('should handle network errors', async () => {
      const mockCustomerContacts : CustomerContacts = mockCustomerContactsRepo;
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Service unavailable'));
      await expect(controller.create(mockCustomerContacts)).rejects.toThrow('Service unavailable');
    });

  });
  
  describe('Update', ()=>{
    const user_id = mockCustomerContactsRepo.contact_id;

    const updatedData : Partial<CustomerContacts> = {
      fax_number:"+4739874",
      additional_contact_info:{
        key1:"radhe",
        key2:"sham"
      }
    }
    const expectedUpdatedUser: CustomerContacts = {
      ...mockCustomerContactsRepo, 
      ...updatedData
    };
    it('should update user contact information',async ()=>{
      jest.spyOn(service,'update').mockResolvedValueOnce(expectedUpdatedUser);
      const updatedUser = await controller.update(user_id,updatedData);
      await expect(updatedUser).toEqual(expectedUpdatedUser);
    });
    it('should handle validation errors may return 400 status code', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Validation failed'));
      await expect(controller.update(user_id,updatedData)).rejects.toThrow('Validation failed');
    });

    it('should handle database errors', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Database error'));
      await expect(controller.update(user_id,updatedData)).rejects.toThrow('Database error');
    });
  
    it('should handle authorization errors', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Unauthorized'));
      await expect(controller.update(user_id,updatedData)).rejects.toThrow('Unauthorized');
    });
  
    it('should handle network errors', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Service unavailable'));
      await expect(controller.update(user_id,updatedData)).rejects.toThrow('Service unavailable');
    });

  });
  
  describe('delete',()=>{
    const mockCustomerContacts: CustomerContacts = mockCustomerContactsRepo;

    it('should delete a user by id', async () => {
      jest.spyOn(service,'delete').mockResolvedValue();
      await service.delete(mockCustomerContacts.contact_id);
      expect(service.delete).toHaveBeenCalledWith(mockCustomerContacts.contact_id);
    });

    it('should handle deletion errors', async () => {
      const userId = mockCustomerContacts.contact_id;
      jest.spyOn(service, 'delete').mockRejectedValue(NotFoundError);
     jest.spyOn(service,'findOne').mockResolvedValueOnce(mockCustomerContacts);
      //mockResolvedValueOnce
      await expect(controller.delete(userId)).rejects.toEqual(NotFoundError);

    });
  
  
  });
 });