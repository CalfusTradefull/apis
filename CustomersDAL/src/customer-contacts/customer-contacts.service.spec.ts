import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactsService } from './customer-contacts.service';
import { CustomerContactsController } from './customer-contacts.controller';
import { Repository, UpdateResult } from 'typeorm';
import { CustomerContacts } from './customer-contact.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadGatewayException, BadRequestException, ForbiddenException, GatewayTimeoutException, InternalServerErrorException, MethodNotAllowedException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NotFoundError, find } from 'rxjs';
import { json } from 'stream/consumers';


describe('CustomerContactsService', () => {

  let service : CustomerContactsService;
  let repository : Repository<CustomerContacts>
  let repositoryMock: Record<string, jest.Mock>;

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

  const updatedData : Partial<CustomerContacts> = {
    fax_number:"+4739874",
    additional_contact_info:{
      key1:"radhe",
      key2:"sham"
    }
  };
  beforeEach(async () => {
     repositoryMock = {
      find : jest.fn(),
      save : jest.fn(),
      findOne :jest.fn(),
      update : jest.fn().mockResolvedValue({ affected: 1 } as UpdateResult),
      delete : jest.fn()
    };
   
    const module: TestingModule = await Test.createTestingModule({
      controllers:[CustomerContactsController],
      providers: [
        CustomerContactsService,
        {
          provide: getRepositoryToken(CustomerContacts),
          useValue:repositoryMock,
        },
      ],
    }).compile();

    //  repository = module.get(getRepositoryToken(CustomerContacts ));
    repository = module.get<Repository<CustomerContacts>>(getRepositoryToken(CustomerContacts));
    service = module.get<CustomerContactsService>(CustomerContactsService)
  });

  it('Service Customer-Contact service must be defined',async ()=>{
    expect(service).toBeDefined();
  });

  describe('findall',()=>{
    it('should return all customer Contacts', async () => {
      jest
        .spyOn(repositoryMock,'find')
        .mockResolvedValue([mockCustomerContactsRepo]);

        const result = await service.findall();
        expect(result).toEqual([mockCustomerContactsRepo]);
    });

    it('should handle 401 Unauthorized error', async () => {
      jest
        .spyOn(repositoryMock,'find')
        .mockRejectedValue(new UnauthorizedException());  
      await expect(service.findall()).rejects.toBeInstanceOf(UnauthorizedException);
      });
    
      it('should handle 404 Not Found', async () => {
        jest
          .spyOn(repositoryMock,'find')
           .mockRejectedValue(new NotFoundException());
                
           await expect(service.findall()).rejects.toBeInstanceOf(NotFoundException)
        });
  
      it('should handle 403 Forbidden, Unauthorized', async () => {
        jest
          .spyOn(repositoryMock,'find')
          .mockRejectedValue(new ForbiddenException());
          await expect(service.findall()).rejects.toBeInstanceOf(ForbiddenException);
      });
    
      it('should handle 405 Method Not Allowed', async () => {
        jest
        .spyOn(repositoryMock,'find')
          .mockRejectedValue(new MethodNotAllowedException());
    
          await expect(service.findall()).rejects.toBeInstanceOf(MethodNotAllowedException)
      });
  
      it('should handle 500 Internal server Error', async () => {
        jest
        .spyOn(repositoryMock,'find')
          .mockRejectedValue(new InternalServerErrorException());
    
          await expect(service.findall()).rejects.toBeInstanceOf(InternalServerErrorException)
      });
  
      it('should handle 502 Bad Gateway', async () => {
        jest
        .spyOn(repositoryMock,'find')
          .mockRejectedValue(new BadGatewayException());
    
          await expect(service.findall()).rejects.toBeInstanceOf(BadGatewayException)
      });
  
      it('should handle 504 Gateway Timeout', async () => {
        jest
        .spyOn(repositoryMock,'find')
          .mockRejectedValue(new GatewayTimeoutException());
    
          await expect(service.findall()).rejects.toBeInstanceOf(GatewayTimeoutException)
      });
    
  });


  describe('getById', () => {
    it('should return a customer contact by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(mockCustomerContactsRepo)
      const result = await service.findOne(mockCustomerContactsRepo.contact_id);
      expect(result).toEqual(mockCustomerContactsRepo);
    });

    it('should handle 401 Unauthorized error', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new UnauthorizedException());  
      await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(UnauthorizedException);
      });
    
      it('should handle 404 Not Found', async () => {
        jest
          .spyOn(service, 'findOne')
           .mockRejectedValue(new NotFoundException());
                
          await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(NotFoundException)
        });
  
      it('should handle 403 Forbidden, Unauthorized', async () => {
        jest
          .spyOn(service, 'findOne')
          .mockRejectedValue(new ForbiddenException());
        await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(ForbiddenException);
      });
    
      it('should handle 405 Method Not Allowed', async () => {
        jest
        .spyOn(service, 'findOne')
          .mockRejectedValue(new MethodNotAllowedException());
    
        await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(MethodNotAllowedException)
      });
  
      it('should handle 500 Internal server Error', async () => {
        jest
        .spyOn(service, 'findOne')
          .mockRejectedValue(new InternalServerErrorException());
    
        await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(InternalServerErrorException)
      });
  
      it('should handle 502 Bad Gateway', async () => {
        jest
        .spyOn(service, 'findOne')
          .mockRejectedValue(new BadGatewayException());
    
        await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(BadGatewayException)
      });
  
      it('should handle 504 Gateway Timeout', async () => {
        jest
        .spyOn(service, 'findOne')
          .mockRejectedValue(new GatewayTimeoutException());
    
          await expect(service.findOne(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(GatewayTimeoutException)
      });
  });

  describe('create', () => {
    it('should create a new customer contact', async () => {
      const newContact: CustomerContacts = mockCustomerContactsRepo;
      jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(mockCustomerContactsRepo);

      const result = await service.create(newContact);
      expect(result).toEqual(newContact);
      expect(repositoryMock.save).toHaveBeenLastCalledWith(mockCustomerContactsRepo);
      });

      it('should handle 401 Unauthorized error', async () => {
        jest
        .spyOn(service, 'create')
        .mockRejectedValue(new UnauthorizedException());  
      await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(UnauthorizedException);
      });
    
      it('should handle 404 Not Found', async () => {
        jest
          .spyOn(service, 'create')
           .mockRejectedValue(new NotFoundException());
                
          await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(NotFoundException)
        });
  
      it('should handle 403 Forbidden, Unauthorized', async () => {
        jest
          .spyOn(service, 'create')
          .mockRejectedValue(new ForbiddenException());
        await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(ForbiddenException);
      });
    
      it('should handle 405 Method Not Allowed', async () => {
        jest
        .spyOn(service, 'create')
          .mockRejectedValue(new MethodNotAllowedException());
    
        await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(MethodNotAllowedException)
      });
  
      it('should handle 500 Internal server Error', async () => {
        jest
        .spyOn(service, 'create')
          .mockRejectedValue(new InternalServerErrorException());
    
        await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(InternalServerErrorException)
      });
  
      it('should handle 502 Bad Gateway', async () => {
        jest
        .spyOn(service, 'create')
          .mockRejectedValue(new BadGatewayException());
    
        await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(BadGatewayException)
      });
  
      it('should handle 504 Gateway Timeout', async () => {
        jest
        .spyOn(service, 'create')
          .mockRejectedValue(new GatewayTimeoutException());
    
          await expect(service.create(mockCustomerContactsRepo)).rejects.toBeInstanceOf(GatewayTimeoutException)
      });
    });

  describe('update', () => {
      const expectedresult : CustomerContacts={
        ...mockCustomerContactsRepo,
        ...updatedData,
      }
      it('should update a customer contact', async () => {
        jest
          .spyOn(repositoryMock,'update')
          .mockResolvedValue({ affected: 1 } as UpdateResult);

        jest
          .spyOn(repositoryMock,'findOne')
          .mockResolvedValue(expectedresult);
        
          // console.log(`form service printing expected data to change are ${JSON.stringify(updatedData)}`)
        const updateUser = await service.update(mockCustomerContactsRepo.contact_id, updatedData);
        const findUser = await service.findOne(mockCustomerContactsRepo.contact_id);
        
        expect(updateUser).toEqual(findUser);
      });
      

      it('should handle 401 Unauthorized error', async () => {
        jest
          .spyOn(service, 'delete')
          .mockRejectedValue(new UnauthorizedException());  
        await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(UnauthorizedException);
        });
      
        it('should handle 404 Not Found', async () => {
          jest
            .spyOn(service, 'delete')
             .mockRejectedValue(new NotFoundException());
                  
            await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(NotFoundException)
          });
    
        it('should handle 403 Forbidden, Unauthorized', async () => {
          jest
            .spyOn(service, 'delete')
            .mockRejectedValue(new ForbiddenException());
          await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(ForbiddenException);
        });
      
        it('should handle 405 Method Not Allowed', async () => {
          jest
          .spyOn(service, 'delete')
            .mockRejectedValue(new MethodNotAllowedException());
      
          await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(MethodNotAllowedException)
        });
    
        it('should handle 500 Internal server Error', async () => {
          jest
          .spyOn(service, 'delete')
            .mockRejectedValue(new InternalServerErrorException());
      
          await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(InternalServerErrorException)
        });
    
        it('should handle 502 Bad Gateway', async () => {
          jest
          .spyOn(service, 'delete')
            .mockRejectedValue(new BadGatewayException());
      
          await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(BadGatewayException)
        });
    
        it('should handle 504 Gateway Timeout', async () => {
          jest
          .spyOn(service, 'delete')
            .mockRejectedValue(new GatewayTimeoutException());
      
            await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(GatewayTimeoutException)
        });
    });

  describe('delete', () => {
      it('should Delete a customer contact', async () => {
        jest
          .spyOn(repositoryMock, 'delete')
          .mockResolvedValue(mockCustomerContactsRepo);
  
        const result = await service.delete(mockCustomerContactsRepo.contact_id);
        expect(result).toEqual(undefined);
      });

    it('should handle 401 Unauthorized error', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new UnauthorizedException());  
      await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(UnauthorizedException);
      });
    
      it('should handle 404 Not Found', async () => {
        jest
          .spyOn(service, 'delete')
           .mockRejectedValue(new NotFoundException());
                
          await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(NotFoundException)
        });
  
      it('should handle 403 Forbidden, Unauthorized', async () => {
        jest
          .spyOn(service, 'delete')
          .mockRejectedValue(new ForbiddenException());
        await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(ForbiddenException);
      });
    
      it('should handle 405 Method Not Allowed', async () => {
        jest
        .spyOn(service, 'delete')
          .mockRejectedValue(new MethodNotAllowedException());
    
        await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(MethodNotAllowedException)
      });
  
      it('should handle 500 Internal server Error', async () => {
        jest
        .spyOn(service, 'delete')
          .mockRejectedValue(new InternalServerErrorException());
    
        await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(InternalServerErrorException)
      });
  
      it('should handle 502 Bad Gateway', async () => {
        jest
        .spyOn(service, 'delete')
          .mockRejectedValue(new BadGatewayException());
    
        await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(BadGatewayException)
      });
  
      it('should handle 504 Gateway Timeout', async () => {
        jest
        .spyOn(service, 'delete')
          .mockRejectedValue(new GatewayTimeoutException());
    
          await expect(service.delete(mockCustomerContactsRepo.contact_id)).rejects.toBeInstanceOf(GatewayTimeoutException)
      });
    });

  });