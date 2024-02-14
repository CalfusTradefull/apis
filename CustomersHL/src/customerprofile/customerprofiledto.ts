export class CustomerProfileDTO {
  profile_id: string;
  customer_id: string;
  customer_address_id: string;
  credit_rating: string;
  credit_limit_amt: number;
  ownership: string;
  bankruptcy_flg: boolean;
  bankruptcy_filed_dt: string;
  year_established: string;
  website_url: string;
  ceo_name: string;
  number_of_employees: string;
  annual_revenue: string;
  additional_profile_info: {
    [key: string]: string;
  };
  create_date: string;
  created_by: string;
  last_update_date: string;
  last_updated_by: string;
}