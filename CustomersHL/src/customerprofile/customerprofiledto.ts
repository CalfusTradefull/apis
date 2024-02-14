import { ApiProperty } from "@nestjs/swagger";

export class CustomerProfileDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  profile_id: string;
  
  @ApiProperty({ example: 'CUST1234' })
  customer_id: string;
  
  @ApiProperty({ example: 'CUSTOMER_ADDRESS_ID_VALUE' })
  customer_address_id: string;
  
  @ApiProperty({ example: '9' })
  credit_rating: string;
  
  @ApiProperty({ example: '1000000' })
  credit_limit_amt: number;

  @ApiProperty({ example: 'Public' })
  ownership: string;

  @ApiProperty({ example: 'false' })
  bankruptcy_flg: boolean;

  @ApiProperty({ example: '2024-02-06' })
  bankruptcy_filed_dt: string;

  @ApiProperty({ example: '2024-01-01' })
  year_established: string;
  
  @ApiProperty({ example: 'www.example.com' })
  website_url: string;

  @ApiProperty({ example: 'John doe' })
  ceo_name: string;

  @ApiProperty({ example: '953' })
  number_of_employees: string;

  @ApiProperty({ example: '90000000' })
  annual_revenue: string;

  @ApiProperty({ example: { key1: 'value', key2: 'value' } })
  additional_profile_info: {
    [key: string]: JSON;
  };

  @ApiProperty({
    example: '2024-02-13 18:19:56.798449+05:30',
    description: 'Date of customer profile creation, auto updated',
  })
  create_date: string;

  @ApiProperty({ example: 'Admin' })
  created_by: string;

  @ApiProperty({
    example: '2024-02-13 18:19:56.798449+05:30',
    description: 'Date of last profile update, auto updated',
  })
  last_update_date: string;

  @ApiProperty({ example: 'Admin' })
  last_updated_by: string;
}