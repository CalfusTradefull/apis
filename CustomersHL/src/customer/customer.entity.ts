import { ApiProperty } from '@nestjs/swagger';

class logistics_fulfillment
  { pick_pack_ship: string; ship_station: string; wms: string }

  class DynamicProperties {
    [key: string]: any;
  }
export class CustomerDTO {
  @ApiProperty({ description: 'Customer name' })
  customer_name: string;

  @ApiProperty({ description: 'Brand name associated with the customer' })
  customer_brand_name: string;

  @ApiProperty({ description: 'TF (Transaction Facility) customer number' })
  tf_customer_number: string;

  @ApiProperty({ description: 'ERP account number' })
  erp_account_number: string;

  @ApiProperty({ description: 'Type of customer (e.g., individual, business)' })
  customer_type: string;

  @ApiProperty({ description: 'Status of the customer (e.g., active, inactive)' })
  customer_status: string;

  @ApiProperty({ description: 'ID of the customer category' })
  customer_category_id: string;

  @ApiProperty({ description: 'Tax identifier number' })
  tax_identifier_number: string;

  @ApiProperty({ description: 'Date since the customer is associated' })
  customer_since_dt: string;

  @ApiProperty({ description: 'ID of the parent customer' })
  parent_customer_id: string;

  @ApiProperty({ description: 'Doing business as name' })
  doing_business_as: string;

  @ApiProperty({ description: 'Flag indicating if the customer is a retail outlet' })
  retail_outlet_flg: boolean;

  @ApiProperty({ description: 'Flag indicating if the customer is a B2B customer' })
  is_b2b_flg: boolean;

  @ApiProperty({ description: 'Flag indicating if the customer is multi-brand' })
  is_multi_brand_flg: boolean;

  @ApiProperty({ description: 'ID of the tier associated with the customer' })
  tier_id: string;

  @ApiProperty({ description: 'ID of the region associated with the customer' })
  region_id: string;

  @ApiProperty({ description: 'ID of the lifecycle stage of the customer' })
  lifecycle_stage_id: string;

  @ApiProperty({ description: 'SIC (Standard Industrial Classification) code' })
  sic_code: string;

  @ApiProperty({ description: 'Type of SIC code' })
  sic_code_type: string;

  @ApiProperty({ description: 'NAICS (North American Industry Classification System) code' })
  naics_code: string;

  @ApiProperty({ description: 'Description of NAICS code' })
  naics_code_descr: string;

  @ApiProperty({ description: 'Stock ticker symbol' })
  stock_ticker: string;

  @ApiProperty({ description: 'Logistics fulfillment information' })
  logistics_fulfillment: logistics_fulfillment;

  @ApiProperty({ description: 'ID of the CIS (Customer Information System)' })
  cis_id: string;

  @ApiProperty({ description: 'DUNS (Data Universal Numbering System) number' })
  duns_number: string;

  @ApiProperty({ description: 'ID from Demandbase' })
  demandbase_id: string;

  @ApiProperty({ description: 'ID from Zoominfo' })
  zoominfo_id: string;

  @ApiProperty({ description: 'Expected arrival information' })
  expected_arr: string;

  @ApiProperty({ description: 'Expected Gross Merchandise Volume' })
  expected_gmv: string;

  @ApiProperty({ description: 'Additional customer information' })
  additional_customer_info: DynamicProperties;

  @ApiProperty({ description: 'User who created the customer record' })
  created_by: string;

  @ApiProperty({ description: 'User who last updated the customer record' })
  last_updated_by: string;
}
