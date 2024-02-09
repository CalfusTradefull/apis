import { ApiProperty } from '@nestjs/swagger';

export class CustomerPreferenceDto {
  @ApiProperty({
    description: 'The unique identifier of the customer',
    example: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  })
  customer_id: string;

  @ApiProperty({
    description: 'The unique identifier of the customer address',
    example: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  })
  customer_address_id: string;

  @ApiProperty({
    description: 'Social media platforms preferences',
    type: 'json',
    example: { facebook: true, twitter: false, instagram: true },
  })
  social_media_platform: any;

  @ApiProperty({
    description: 'Dot com location preferences',
    type: 'json',
    example: { website1: true, website2: false },
  })
  dot_com_location: any;

  @ApiProperty({
    description: 'Marketplace preferences',
    type: 'json',
    example: { amazon: true, ebay: false, etsy: true },
  })
  market_place: any;

  @ApiProperty({
    description: 'Additional preferences information',
    type: 'json',
    example: { key1: 'value1', key2: 'value2' },
  })
  additional_preferences_info: any;

  @ApiProperty({
    description: 'The user who created the customer preference',
    example: 'john_doe',
  })
  created_by: string;

  @ApiProperty({
    description: 'The user who last updated the customer preference',
    example: 'jane_doe',
  })
  last_updated_by: string;
}
