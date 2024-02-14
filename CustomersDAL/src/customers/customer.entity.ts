import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Customer {
  
  // Primary key generated as UUID
  @PrimaryGeneratedColumn("uuid")
  customer_id: string;

  // Customer name
  @Column()
  customer_name : string;

  // Brand name associated with the customer
  @Column()
  customer_brand_name : string;

  // TF customer number
  @Column()
  tf_customer_number : string;

  // ERP account number
  @Column()
  erp_account_number : string;

  // Type of customer (e.g., individual, business)
  @Column()
  customer_type : string;

  // Status of the customer (e.g., active, inactive)
  @Column()
  customer_status : string;

  // Customer category ID
  @Column()
  customer_category_id : string;

  // Tax identifier number for the customer
  @Column()
  tax_identifier_number : string;

  // Date when the customer was acquired
  @Column()
  customer_since_dt : string;

  // Parent customer ID, if applicable
  @Column()
  parent_customer_id : string;

  // Doing business as (DBA) name
  @Column()
  doing_business_as : string;

  // Flag indicating if the customer has a retail outlet
  @Column()
  retail_outlet_flg : boolean;

  // Flag indicating if the customer is a B2B customer
  @Column()
  is_b2b_flg : boolean;

  // Flag indicating if the customer has multiple brands
  @Column()
  is_multi_brand_flg : boolean;

  // Tier ID associated with the customer
  @Column()
  tier_id : string;

  // Region ID associated with the customer
  @Column()
  region_id : string;

  // Lifecycle stage ID of the customer
  @Column()
  lifecycle_stage_id : string;

  // SIC code (Standard Industrial Classification)
  @Column()
  sic_code : string;

  // Type of SIC code
  @Column()
  sic_code_type : string;

  // NAICS code (North American Industry Classification System)
  @Column()
  naics_code : string;

  // Description associated with NAICS code
  @Column()
  naics_code_descr : string;

  // Stock ticker symbol
  @Column()
  stock_ticker : string;

  // Logistics fulfillment information stored as JSON
  @Column("simple-json")
  logistics_fulfillment: { pick_pack_ship: string; ship_station: string; wms: string };

  // Customer CIS ID
  @Column()
  cis_id : string;

  // DUNS number (Data Universal Numbering System)
  @Column()
  duns_number : string;

  // Demandbase ID
  @Column()
  demandbase_id : string;

  // Zoominfo ID
  @Column()
  zoominfo_id : string;

  // Expected arrival information
  @Column()
  expected_arr : string;

  // Expected Gross Merchandise Volume (GMV)
  @Column()
  expected_gmv : string;

  // Additional customer information stored as JSON
  @Column("simple-json")
  additional_customer_info: { key1: string; key2: string };

  // Date of customer creation
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  // Created by user
  @Column()
  created_by : string;

  // Date of the last update
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: Date;

  // Last updated by user
  @Column()
  last_updated_by : string;
}
