import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerProfile {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @ApiProperty({ example: 'CUST1234' })
  @Column()
  customer_id: string;

  @ApiProperty({ example: 'CUSTOMER_ADDRESS_ID_VALUE' })
  @Column()
  customer_address_id: string;

  @ApiProperty({ example: '9' })
  @Column()
  // numeric / varchar , tbd
  credit_rating: string;

  @ApiProperty({ example: '1000000' })
  @Column()
  credit_limit_amt: number;

  @ApiProperty({ example: 'Public' })
  @Column()
  // public | private
  ownership: string;

  @ApiProperty({ example: 'false' })
  @Column()
  bankruptcy_flg: boolean;

  @ApiProperty({ example: '2024-02-06' })
  @Column({ type: 'date' })
  bankruptcy_filed_dt: string;

  @ApiProperty({ example: '2024-01-01' })
  @Column({ type: 'date' })
  // year the customer's business was established, add format for year only
  year_established: string;

  @ApiProperty({ example: 'www.example.com' })
  @Column()
  website_url: string;

  @ApiProperty({ example: 'John doe' })
  @Column()
  ceo_name: string;

  @ApiProperty({ example: '953' })
  @Column()
  number_of_employees: string;

  @ApiProperty({ example: '90000000' })
  @Column()
  annual_revenue: string;

  @ApiProperty({ example: { key1: 'value', key2: 'value' } })
  @Column('simple-json')
  additional_profile_info: JSON;

  @ApiProperty({
    example: '2024-02-07',
    description: 'Date of customer profile creation, auto updated',
  })
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: string;

  @ApiProperty({ example: 'Admin' })
  @Column()
  created_by: string;

  @ApiProperty({
    example: '2024-02-07',
    description: 'Date of last profile update, auto updated',
  })
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: string;

  @ApiProperty({ example: 'Admin' })
  @Column()
  last_updated_by: string;
}

// credit_hold_flg boolean not null default 'false',
// credit_check_reqd_flg boolean not null default 'false',
// minority_owned_flg boolean not null default 'false',
// women_owned_flg boolean not null default 'false',
// small_business_flg  boolean not null default 'false',
