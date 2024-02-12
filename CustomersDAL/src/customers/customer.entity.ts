import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Customer {
  
  @PrimaryGeneratedColumn("uuid")
  customer_id: string;

  @Column()
  customer_name : string

  @Column()
  customer_brand_name : string

  @Column()
  tf_customer_number : string

  @Column()
  erp_account_number : string

  @Column()
  customer_type : string

  @Column()
  customer_status : string

  @Column()
  customer_category_id : string

  @Column()
  tax_identifier_number : string

  @Column()
  customer_since_dt : string

  @Column()
  parent_customer_id : string

  @Column()
  doing_business_as : string

  @Column()
  retail_outlet_flg : boolean

  @Column()
  is_b2b_flg : boolean

  @Column()
  is_multi_brand_flg : boolean

  @Column()
  tier_id : string

  @Column()
  region_id : string

  @Column()
  lifecycle_stage_id : string

  @Column()
  sic_code : string

  @Column()
  sic_code_type : string

  @Column()
  naics_code : string

  @Column()
  naics_code_descr : string

  @Column()
  stock_ticker : string

  @Column("simple-json")
  logistics_fulfillment: { pick_pack_ship: string; ship_station: string; wms: string }

  @Column()
  cis_id : string

  @Column()
  duns_number : string

  @Column()
  demandbase_id : string

  @Column()
  zoominfo_id : string

  @Column()
  expected_arr : string

  @Column()
  expected_gmv : string

  @Column("simple-json")
  additional_customer_info: { key1: string; key2: string }

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date

  @Column()
  created_by : string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: Date

  @Column()
  last_updated_by : string

 
}
