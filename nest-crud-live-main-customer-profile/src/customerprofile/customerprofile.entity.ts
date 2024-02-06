import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerProfile {
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @Column()
  customer_id: string;

  @Column()
  customer_address_id: string;

  @Column()
  // numeric  / varchar , tbd
  credit_rating: string;

  @Column()
  credit_limit_amt: number;

  @Column()
  // public | private
  ownership: string;

  @Column()
  bankruptcy_flg: boolean;

  @Column({ type: 'date' })
  bankruptcy_filed_dt: string;

  @Column({ type: 'date' })
  // year the customer's business was established, add format for year only
  year_established: string;

  @Column()
  website_url: string;

  @Column()
  ceo_name: string;

  @Column()
  number_of_employees: string;

  @Column()
  annual_revenue: string;

  @Column('simple-json')
  additional_profile_info: JSON;

  @Column({ type: 'date', default: () => 'NOW()' })
  create_date: string;

  @Column()
  created_by: string;

  @Column({ type: 'date', default: () => 'NOW()' })
  last_update_date: string;

  @Column()
  last_updated_by: string;
}

// credit_hold_flg boolean not null default 'false',
// credit_check_reqd_flg boolean not null default 'false',
// minority_owned_flg boolean not null default 'false',
// women_owned_flg boolean not null default 'false',
// small_business_flg  boolean not null default 'false',
