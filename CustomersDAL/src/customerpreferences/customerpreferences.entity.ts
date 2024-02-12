// customer-preference.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CustomerPreference {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the customer preference',
    example: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  })
  customer_preference_id: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'The unique identifier of the customer',
    example: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  })
  customer_id: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'The unique identifier of the customer address',
    example: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  })
  customer_address_id: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    description: 'Social media platforms preferences',
    type: 'json',
    example: { facebook: true, twitter: false, instagram: true },
  })
  social_media_platform: any;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    description: 'Dot com location preferences',
    type: 'json',
    example: { website1: true, website2: false },
  })
  dot_com_location: any;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    description: 'Marketplace preferences',
    type: 'json',
    example: { amazon: true, ebay: false, etsy: true },
  })
  market_place: any;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    description: 'Additional preferences information',
    type: 'json',
    example: { key1: 'value1', key2: 'value2' },
  })
  additional_preferences_info: any;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date when the customer preference was created',
    example: '2022-02-14T12:30:45Z',
  })
  create_date: Date;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'The user who created the customer preference',
    example: 'john_doe',
  })
  created_by: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Date when the customer preference was last updated',
    example: '2022-02-14T14:45:30Z',
  })
  last_update_date: Date;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'The user who last updated the customer preference',
    example: 'jane_doe',
  })
  last_updated_by: string;
}
