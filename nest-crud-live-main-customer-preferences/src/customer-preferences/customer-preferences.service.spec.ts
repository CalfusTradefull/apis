import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPreferenceService } from './customer-preferences.service';
import { CustomerPreference } from './customer-preferences-entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, CustomRepositoryNotFoundError } from 'typeorm';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
// Define the MockType utility type
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
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
/**
 * description
 */
const mockUpdateData: Partial<CustomerPreference> = {
  additional_preferences_info: {
    key1: 'value1',
    key2: 'value2',
  },
  create_date: new Date(),
  created_by: 'john_doe',
  last_update_date: new Date(),
  last_updated_by: 'jane_doe',
};

describe('CustomerPreferenceService', () => {
  const mocCustomerPreferenceService: typeof mockCustomerPreferencesRepo = {
    findOne: jest.fn(),
    find: jest.fn().mockResolvedValue([]),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any;

  let service: CustomerPreferenceService;
  let repositoryMock: MockType<Repository<CustomerPreference>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerPreferenceService,
        {
          provide: getRepositoryToken(CustomerPreference),
          useValue: mocCustomerPreferenceService,
        },
      ],
    }).compile();
    service = module.get<CustomerPreferenceService>(CustomerPreferenceService);
    repositoryMock = module.get(getRepositoryToken(CustomerPreference));
  });
  it('should be defined >> CustomerPreferenceService', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return customer preference by id', async () => {
      jest
        .spyOn(repositoryMock, 'findOne')
        .mockImplementation(() => mockCustomerPreferencesRepo);

      const result = await service.getById(
        mockCustomerPreferencesRepo.customer_preference_id,
      );
      expect(result).toEqual(mockCustomerPreferencesRepo);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: {
          customer_preference_id:
            mockCustomerPreferencesRepo.customer_preference_id,
        },
      });
    });

    it("should throw an error if the customer preference doesn't exist", async () => {
      jest
        .spyOn(repositoryMock, 'findOne')
        .mockResolvedValue(undefined as never);
      await expect(
        service.getById('1d5b0b0a-44f9-4516-8a43-2e721b86dfe2'),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Get all customerPreference ', () => {
    it('should get a list of customer preferences', async () => {
      const expectedPreferences: CustomerPreference[] = [
        { ...mockCustomerPreferencesRepo },
      ];
      jest
        .spyOn(repositoryMock, 'find')
        .mockResolvedValue(expectedPreferences as never);
      const result = await service.getAll();
      expect(result).toEqual(expectedPreferences);
      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
    });
    it('should return an empty array when no customer preferences exist', async () => {
      // Arrange
      jest
        .spyOn(repositoryMock, 'find')
        .mockResolvedValue([] as unknown as never);

      // Act
      const result = await service.getAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a customer preference', async () => {
      const mockCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;

      repositoryMock.save.mockResolvedValue(mockCustomerPreference as never);

      const result = await service.create(mockCustomerPreference);

      expect(result).toEqual(mockCustomerPreference);
      expect(repositoryMock.save).toHaveBeenCalledWith(mockCustomerPreference);
    });

    it('should handle repository not found error during create', async () => {
      const mockCustomerPreference: CustomerPreference =
        mockCustomerPreferencesRepo;

      repositoryMock.save.mockRejectedValue(
        new CustomRepositoryNotFoundError(
          'Custom repository String was not found.' as never,
        ) as never,
      );

      await expect(service.create(mockCustomerPreference)).rejects.toThrowError(
        new HttpException(
          'Custom repository String was not found. Did you forgot to put @EntityRepository decorator on it?',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    describe('updateById', () => {
      it('should update customer preference successfully', async () => {
        jest
          .spyOn(service, 'getById')
          .mockResolvedValue(mockCustomerPreferencesRepo);

        jest.spyOn(repositoryMock, 'update').mockResolvedValue({} as never);

        jest
          .spyOn(service, 'getById')
          .mockResolvedValue(mockCustomerPreferencesRepo);

        const updatedPreference = await service.updateById(
          '1d5b0b0a-44f9-4516-8a43-2e721b86dfe1',
          mockUpdateData,
        );

        expect(updatedPreference).toEqual(mockCustomerPreferencesRepo);
      });

      it('should throw an error if the customer preference does not exist', async () => {
        jest.spyOn(service, 'getById').mockImplementation(() => {
          throw new NotFoundException('Customer preference not found');
        });

        await expect(
          service.updateById('nonexistent-id', mockUpdateData),
        ).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe('deleteById', () => {
    it('should delete customer preference successfully', async () => {
      repositoryMock.delete.mockResolvedValue({ affected: 1 } as never);

      await service.deleteById('1d5b0b0a-44f9-4516-8a43-2e721b86dfe1');

      expect(repositoryMock.delete).toHaveBeenCalledWith(
        '1d5b0b0a-44f9-4516-8a43-2e721b86dfe1',
      );
    });

    it('should throw an error if the customer preference does not exist', async () => {
      repositoryMock.delete.mockResolvedValue({ affected: 0 } as never);

      await expect(service.deleteById('nonexistent-id')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
