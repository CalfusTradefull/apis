import { ApiProperty } from "@nestjs/swagger";

export class CustomerContacts{

    @ApiProperty({
        description: 'The unique identifier of the Customer Contact',
        example: '3c4fbb20-92d7-4ae0-bfcd-2230c6cb3ef3',
      })
    contact_id:string;

     
    @ApiProperty({
        description: 'Unique identifier of the Customer ID',
        example: '2324',
      })
    customer_id:string;

     
    @ApiProperty({
        description:'Unique identifier of the Customer Address ID',
        example:23240
    })
    customer_address_id:string;

     
    @ApiProperty({
        description:'Customer First Name',
        example:'sam'
    })
    first_name:string;

     
    @ApiProperty({
        description:'Customer Middle Name',
        example:'sammy'
    })
    middle_name:string;

     
    @ApiProperty({
        description:'Customer Last Name',
        example:'simon'
    })
    last_name:string;

     
    @ApiProperty({
        description:'Customer title',
        example:'mr'
    })
    title:string;
    //--mr, mrs, ms etc

    @ApiProperty({
        description:'Customer email',
        example:'example@gmail.com'
    })
    email_address:string;

   
    @ApiProperty({
        description:'Customer Phone Number',
        example:'+98867579'
    })
    phone_number:string;

   
    @ApiProperty({
        description:'Customer Phone Extension',
        example:'+88'
    })
    phone_number_extn:string;

     
    @ApiProperty({
        description:'Customer Fax Number',
        example:''
    })
    fax_number:string;

    
    @ApiProperty({
        description:'Primary Flag',
        example:'false'
    })
    primary_flg:boolean;

    
    @ApiProperty({
        description:'Authorize Signature Flag',
        example:'flase'
    })
    authorized_signatory_flg:boolean;

    
    @ApiProperty({
        description:'Electronic signature flag',
        example:'flase'
    })
    electronic_signature_flg:boolean;

     
    @ApiProperty({
        description:'Designation',
        example:'Manager'
    })
    designation:string;

     
    @ApiProperty({
        description:'Customer Contact Status',
        example:'Active'
    })
    contact_status:string;

      
    @ApiProperty({
        description:'Active Start Date',
        example:''
    })
    active_start_date:string;

      
    @ApiProperty({
        description:'Active End Date',
        example:''
    })
    active_end_date:string;

    
    @ApiProperty({
        description:'Customer Prefered COntact Method',
        example:'email'
    })
    preferred_contact_method:string;

    @ApiProperty({
        description:'Additional contact info',
        example:''
    })
    additional_contact_info : { key1: string; key2: string }
    
    
    @ApiProperty({
        description:'Customer Create Date',
        example:''
    })
    create_date: string;

     
    @ApiProperty({
        description:'Customer Created By',
        example:'Admin'
    })
    created_by : string

    @ApiProperty({
        description:'Customer Last Updated Date',
        example:''
    })
    last_update_date: string;

    @ApiProperty({
        description:'Customer Last Updated By',
        example:''
    })
    last_updated_by : string

}