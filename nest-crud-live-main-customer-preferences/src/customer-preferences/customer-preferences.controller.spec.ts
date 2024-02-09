import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPreferencesController } from './customer-preferences.controller';
import { CustomerPreferenceService } from './customer-preferences.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerPreference } from './customer-preferences-entity';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { MockType } from './customer-preferences.service.spec';

const repositoryMock = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => dto),
  find: jest.fn().mockImplementation(() => []),
  findOneOrFail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
const mockCustomerPreferencesRepo = {
  customer_preference_id: '1d5b0b0a-44f9-4516-8a43-2e721b86dfe1',
  customer_id: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  customer_address_id: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  social_media_platform: {
    facebook: true,
    twitter: false,
    instagram: true,
  },
  dot_com_location: {
    website1: true,
    website2: false,
  },
  market_place: {
    amazon: true,
    ebay: false,
    etsy: true,
  },
  additional_preferences_info: {
    key1: 'value1',
    key2: 'value2',
  },
  create_date: new Date(),
  created_by: 'john_doe',
  last_update_date: new Date(),
  last_updated_by: 'jane_doe',
};

const mockCustomerPreferencesRepoUpdated = {
  customer_preference_id: '1d5b0b0a-44f9-4516-8a43-2e721b86dfe1',
  customer_id: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  customer_address_id: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  social_media_platform: {
    facebook: true,
    twitter: false,
    instagram: true,
  },
  dot_com_location: {
    website1: true,
    website2: false,
  },
  market_place: {
    amazon: true,
    ebay: false,
    etsy: true,
  },
  additional_preferences_info: {
    key1: 'value1',
    key2: 'value2',
  },
  create_date: new Date(),
  created_by: 'john_doe1',
  last_update_date: new Date(),
  last_updated_by: 'jane_doe',
};

const mockUpdateData: Partial<CustomerPreference> = {
  created_by: 'john_doe1',
};
describe('CustomerPreferencesController', () => {
  let controller: CustomerPreferencesController;
  let service: CustomerPreferenceService;
  let repositoryMock: MockType<Repository<CustomerPreference>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerPreferencesController],
      providers: [
        CustomerPreferenceService,
        {
          provide: getRepositoryToken(CustomerPreference),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    controller = module.get<CustomerPreferencesController>(
      CustomerPreferencesController,
    );
    repositoryMock = module.get(getRepositoryToken(CustomerPreference));

    service = module.get<CustomerPreferenceService>(CustomerPreferenceService);
  });

  it('should be defined controller > CustomerPreferencesController ', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined service > CustomerPreferenceService', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer preference', async () => {
      const mockCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;
      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCustomerPreference);

      const result = await controller.create(mockCustomerPreference);

      expect(result).toEqual(mockCustomerPreference);
      expect(service.create).toHaveBeenCalledWith(mockCustomerPreference);
    });

    it('should handle validation errors and return 400 Bad Request', async () => {
      const mockCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(
          new QueryFailedError('Validation error', [], '' as unknown as Error),
        );

      await expect(
        controller.create(mockCustomerPreference),
      ).rejects.toThrowError(HttpException);
      expect(service.create).toHaveBeenCalledWith(mockCustomerPreference);
    });

    it('should handle other errors and return 500 Internal Server Error', async () => {
      const mockCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;

      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new Error('Validation error'));
      await expect(
        controller.create(mockCustomerPreference),
      ).rejects.toThrowError(Error);
      expect(service.create).toHaveBeenCalledWith(mockCustomerPreference);
    });
  });

  describe('getAll', () => {
    it('should return all customer preferences', async () => {
      const mockCustomerPreferences: CustomerPreference[] = [
        mockCustomerPreferencesRepo,
        mockCustomerPreferencesRepo,
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(mockCustomerPreferences);
      const result = await controller.getAll();
      expect(result).toEqual(mockCustomerPreferences);
      expect(service.getAll).toHaveBeenCalled();
    });
  });
  describe('getById', () => {
    it('should return a customer preference by ID', async () => {
      const mockCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;
      jest
        .spyOn(service, 'getById')
        .mockResolvedValueOnce(mockCustomerPreference);

      // Act
      const result = await controller.getById(
        mockCustomerPreference.customer_preference_id,
      );

      // Assert
      expect(result).toEqual(mockCustomerPreference);
      expect(service.getById).toHaveBeenCalledWith(
        mockCustomerPreference.customer_preference_id,
      );
    });

    it('should throw NotFoundException if customer preference is not found', async () => {
      // Arrange
      const mockCustomerId = '4f94ae7e-c3c7-4fd7-9b58-37967b846619';
      jest
        .spyOn(service, 'getById')
        .mockRejectedValueOnce(
          new NotFoundException('Customer preference not found'),
        );

      // Act & Assert
      await expect(controller.getById(mockCustomerId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.getById).toHaveBeenCalledWith(mockCustomerId);
    });
  });

  describe('updateById', () => {
    it('should update a customer preference by ID', async () => {
      // Arrange
      const mockCustomerId = '4f94ae7e-c3c7-4fd7-9b58-37967b846619';
      const mockCustomerPreferenceData: Partial<CustomerPreference> =
        mockUpdateData;
      const mockUpdatedCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;
      jest
        .spyOn(service, 'getById')
        .mockResolvedValueOnce(mockCustomerPreferencesRepo);
      jest
        .spyOn(service.customerPreferenceRepository, 'update')
        .mockResolvedValueOnce(mockUpdatedCustomerPreference);
      jest
        .spyOn(service, 'getById')
        .mockResolvedValueOnce(mockUpdatedCustomerPreference);

      // Act
      const result = await service.updateById(
        mockCustomerId,
        mockCustomerPreferenceData,
      );

      // Assert
      expect(result).toEqual(mockUpdatedCustomerPreference);
      expect(service.getById).toHaveBeenCalledWith(mockCustomerId);
      expect(service.customerPreferenceRepository.update).toHaveBeenCalledWith(
        mockCustomerId,
        mockCustomerPreferenceData,
      );
      expect(service.getById).toHaveBeenCalledWith(mockCustomerId);
    });

    it('should throw NotFoundException if customer preference is not found', async () => {
      // Arrange
      const mockCustomerId = 'nonexistent-id';
      const mockCustomerPreferenceData: Partial<CustomerPreference> =
        mockCustomerPreferencesRepoUpdated;

      jest
        .spyOn(service, 'getById')
        .mockRejectedValueOnce(
          new NotFoundException('Customer preference not found'),
        );

      // Act & Assert
      await expect(
        service.updateById(mockCustomerId, mockCustomerPreferenceData),
      ).rejects.toThrowError(NotFoundException);
      expect(service.getById).toHaveBeenCalledWith(mockCustomerId);
      expect(
        service.customerPreferenceRepository.update,
      ).not.toHaveBeenCalled();
    });
  });
});
