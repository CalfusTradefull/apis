import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class customer_address {
  @ApiProperty({
    description: 'The unique identifier for the address',
    example: '2a67b07d-670c-4fe5-87a9-ee5f503e6717',
  })
  @PrimaryGeneratedColumn('uuid')
  address_id: string;

  @ApiProperty({
    description: 'The customer ID associated with the address',
    example: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
  })
  @Column()
  customer_id: string;

  @ApiProperty({
    description: 'The type of address (bill_to, ship_to, hq)',
    example: { bill_to: true, ship_to: false, hq: false },
  })
  @Column('simple-json')
  address_type: { bill_to: boolean; ship_to: boolean; hq: boolean };

  @ApiProperty({
    description: 'A nickname associated with the address',
    example: 'home',
  })
  @Column()
  address_nick_nm: string;

  @ApiProperty({
    description: 'The first line of the address',
    example: 'house/flat no, building name, street name/number',
  })
  @Column()
  address1: string;

  @ApiProperty({
    description: 'The second line of the address',
    example: 'Block no., Area Name',
  })
  @Column()
  address2: string;

  @ApiProperty({
    description: 'The third line of the address',
    example: 'City/district, state',
  })
  @Column()
  address3: string;

  @ApiProperty({
    description: 'The fourth line of the address',
    example: 'Country, ZIP code',
  })
  @Column()
  address4: string;

  @ApiProperty({
    description: 'City where the address is located',
    example: 'Delhi',
  })
  @Column()
  city: string;

  @ApiProperty({
    description: 'Postal Code of the address',
    example: '110017',
  })
  @Column()
  postal_code: string;

  @ApiProperty({
    description: 'State or Province name',
    example: 'Delhi',
  })
  @Column()
  state_province_nm: string;

  @ApiProperty({
    description: 'State or Province code',
    example: 'DL',
  })
  @Column()
  state_province_cd: string;

  @ApiProperty({
    description: 'County where the address is located',
    example: 'XYZ County',
  })
  @Column()
  county: string;

  @ApiProperty({
    description: 'Country name',
    example: 'India',
  })
  @Column()
  country_nm: string;

  @ApiProperty({
    description: 'Country code',
    example: 'IN',
  })
  @Column()
  country_cd: string;

  @ApiProperty({
    description: 'Flag indicating whether the address is validated',
    example: true,
  })
  @Column()
  validated_flg: boolean;

  @ApiProperty({
    description: 'Additional information about the address',
    example: { key1: 'value1', key2: 'value2' },
  })
  @Column('simple-json')
  additional_address_info: { key1: string; key2: string };

  @ApiProperty({
    description: 'Date when the address was created',
    example: '2024-02-14T10:30:00Z',
  })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @ApiProperty({
    description: 'User who created the address',
    example: 'john_doe',
  })
  @Column()
  created_by: string;

  @ApiProperty({
    description: 'Date when the address was last updated',
    example: '2024-02-14T12:45:00Z',
  })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: Date;

  @ApiProperty({
    description: 'User who last updated the address',
    example: 'jane_smith',
  })
  @Column()
  last_updated_by: string;
}

// //{
//  "customer_id": "46a37ae7-3882-4f67-b970-c74f599a379f3",
//  "address_type": {
//      "bill_to": true
//  },
//  "address_nick_nm": "Test",
//  "address1": "pune",
//  "address2": "banner",
//  "address3": "",
//  "address4": "",
//  "city": "pune",
//  "postal_code": "414041",
//  "state_province_nm": "MH",
//  "state_province_cd": "MH",
//  "county": "India",
//  "country_nm": "In",
//  "country_cd": "91",
//  "validated_flg": false,
//  "additional_address_info": {
//      "test": "vishal"
//  },
//  "created_by": "vishal",
//  "last_updated_by":"bikkad"
// }
