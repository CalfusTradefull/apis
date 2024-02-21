import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

//@Entity({name:'Customer Contact'})
@Entity('customer_contacts')
export class CustomerContacts{

    @PrimaryGeneratedColumn("uuid")
    @ApiProperty({
        description: 'The unique identifier of the Customer Contact',
        example: '3c4fbb20-92d7-4ae0-bfcd-2230c6cb3ef3',
      })
    contact_id:string;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'Unique identifier of the Customer ID',
        example: '2324',
      })
    customer_id:string;

    @Column({ nullable: false })
    @ApiProperty({
        description:'Unique identifier of the Customer Address ID',
        example:23240
    })
    customer_address_id:string;

    @Column({ nullable: false })
    @ApiProperty({
        description:'Customer First Name',
        example:'sam'
    })
    first_name:string;

    @Column({ nullable: false })
    @ApiProperty({
        description:'Customer Middle Name',
        example:'sammy'
    })
    middle_name:string;

    @Column({ nullable: false })
    @ApiProperty({
        description:'Customer Last Name',
        example:'simon'
    })
    last_name:string;

    @Column({ nullable: true })
    @ApiProperty({
        description:'Customer title',
        example:'mr'
    })
    title:string;
    //--mr, mrs, ms etc

    @Column({ nullable: false })
    email_address:string;

    @Column({ nullable: false , default:'+28467284628'})
    @ApiProperty({
        description:'Customer Phone Number',
        example:'+98867579'
    })
    phone_number:string;

    @Column({nullable:true})
    @ApiProperty({
        description:'Customer Phone Extension',
        example:'+88'
    })
    phone_number_extn:string;

    @Column({ nullable: true })
    @ApiProperty({
        description:'Customer Fax Number',
        example:''
    })
    fax_number:string;

    @Column({ nullable: true, default: 'true' })
    @ApiProperty({
        description:'Primary Flag',
        example:'false'
    })
    primary_flg:boolean;

    @Column({ nullable: true, default: 'true' })
    @ApiProperty({
        description:'Authorize Signature Flag',
        example:'flase'
    })
    authorized_signatory_flg:boolean;

    @Column({ nullable: true, default: 'true' })
    @ApiProperty({
        description:'Electronic signature flag',
        example:'flase'
    })
    electronic_signature_flg:boolean;

    @Column({ nullable: true , default:'Manager'})
    @ApiProperty({
        description:'Designation',
        example:'Manager'
    })
    designation:string;

    @Column({ nullable: true ,default:'Active'})
    @ApiProperty({
        description:'Customer Contact Status',
        example:'Active'
    })
    contact_status:string;

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE', nullable: true })
    @ApiProperty({
        description:'Active Start Date',
        example:''
    })
    active_start_date:string;

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE', nullable: true  })
    @ApiProperty({
        description:'Active End Date',
        example:''
    })
    active_end_date:string;

    @Column({ nullable: true, default: 'e-Mail' })
    @ApiProperty({
        description:'Customer Prefered COntact Method',
        example:'email'
    })
    preferred_contact_method:string;
    //--email, phone, fax, mail

    @Column("simple-json",{default:{
        key1: 'friend1',key2: 'friend2'
    },nullable:true})
    @ApiProperty({
        description:'Additional contact info',
        example:''
    })
    additional_contact_info : { key1: string; key2: string }
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true  }) 
    @ApiProperty({
        description:'Customer Create Date',
        example:''
    })
    create_date: string;

    @Column({ nullable: true })
    @ApiProperty({
        description:'Customer Created By',
        example:'Admin'
    })
    created_by : string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true  })
    @ApiProperty({
        description:'Customer Last Updated Date',
        example:''
    })
    last_update_date: string;

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({
        description:'Customer Last Updated By',
        example:''
    })
    last_updated_by : string

}