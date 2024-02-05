# This Repository contains all the APIs related to TradeFull.

## Steps
=======

Each of the API folder contains docker file for App & Postgres DB.

1. docker compose build
2. docker compose up
3. Swagger - http://localhost:3000/api-docs

4. User API Post Request
   =====================
```json
{
  "user_name": "hbhadra",
  "first_name" : "Himanshu",
  "last_name" : "Bhadra",
  "middle_name" : "K",
  "email_address": "himanshu.bhadra@calfus.com",
  "phone_number" : "6692264820",
  "additional_user_info" : { "key1": "val1", "key2": "val2" },
  "created_by" : "hbhadra",
  "last_updated_by" : "hbhadra"

}
```
5. Role API Post Request
   =====================
```json
  {
  "role_name": "Engineer",
  "role_name_cd" : "Himanshu",
  "role_status" : "Active",
  "active_end_dt" : "05/31/2025",
  "created_by" : "hbhadra",
  "last_updated_by" : "hbhadra",
  "additional_role_info" : { "key1": "val1", "key2": "val2" },
  "created_by" : "hbhadra",
  "last_updated_by" : "hbhadra"

}
```
6. User Role API Post Request
   ==========================
```json
{
  "user_id" : "6ab8be92-46f0-4f5a-ad9c-71d911383b87",
	"role_id" : "0f8f795e-7407-4708-a51d-a62efb5fc6e7",
  "role_status" : "Active",
  "active_end_dt" : "05/31/2025",
  "created_by" : "hbhadra",
  "last_updated_by" : "hbhadra",
  "additional_role_info" : { "key1": "val1", "key2": "val2" },
  "created_by" : "hbhadra",
  "last_updated_by" : "hbhadra"
}
```
7. Customer API Post Request
   =========================

```json
{
 "customer_name": "ABC",
 "customer_brand_name": "Ashley",
 "tf_customer_number": "1267547",
 "erp_account_number": "8975634",
 "customer_type": "reseller",
 "customer_status": "Active",
 "customer_category_id": "8ab8be92-46f0-4f5a-aw9c-71x911383b87",
 "tax_identifier_number" : "EIN6784562",
 "customer_since_dt": "05/31/2025",
 "parent_customer_id": "9ab8bg92-46k0-4f5a-qw9c-71x911383b87",
 "doing_business_as": "Retailer",
 "retail_outlet_flg": "false",
 "is_b2b_flg": "false",
 "is_multi_brand_flg": "false",
 "tier_id": "3ab8bg92-96k0-4f5a-qe9c-71x911383b87",
 "region_id": "5ab3bg92-86k0-4f5a-qe9c-71x911383b87",
 "lifecycle_stage_id": "9ab3bg92-86d0-4f5a-ae9c-71x911383b82",
 "sic_code": "001",
 "sic_code_type": "standard",
 "naics_code" : "9897",
 "naics_code_descr": "xyz",
 "stock_ticker": "APL",
 "logistics_fulfillment" : { "pick_pack_ship": "asd", "station": "frtttt", "wms": "erxcc" },
 "cis_id": "8ab3bg42-86d0-4f5a-ae9c-71x411393b82",
 "duns_number": "3323232",
 "demandbase_id":"9vb3bg22-86d0-4f5a-ae9c-71x911383b82",
 "zoominfo_id":"9vb3bg20-86d0-4f5a-ae9c-71x911383b36",
 "expected_arr":"3",
 "expected_gmv":"19",
 "additional_customer_info":{ "key1": "xyz", "key2": "abc" },
 "created_by": "hbhadra",
 "last_updated_by": "Durga"

}
```


   


