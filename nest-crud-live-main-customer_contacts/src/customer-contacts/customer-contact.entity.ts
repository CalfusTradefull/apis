import { UUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerContacts{

    @PrimaryGeneratedColumn("uuid")
    contact_id:UUID;

    @Column()
    customer_id:string;

    @Column()
    customer_address_id:string;

    @Column()
    first_name:string;

    @Column()
    middle_name:string;

    @Column()
    last_name:string;

    @Column()
    title:string;
    //--mr, mrs, ms etc

    @Column({ nullable: false })
    email_address:string;

    @Column()
    phone_number:string;

    @Column()
    phone_number_extn:string;

    @Column()
    fax_number:string;

    @Column({ nullable: false, default: 'false' })
    primary_flg:boolean;

    @Column({ nullable: false, default: 'false' })
    authorized_signatory_flg:boolean;

    @Column({ nullable: false, default: 'true' })
    electronic_signature_flg:boolean;

    @Column()
    designation:string;

    @Column()
    contact_status:string;

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
    active_start_date:Date;

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
    active_end_date:Date;

    @Column({ nullable: false, default: 'e-Mail' })
    preferred_contact_method:string;
    //--email, phone, fax, mail

    @Column("simple-json")
    additional_contact_info : { key1: string; key2: string }
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    create_date: Date

    @Column()
    created_by : string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_update_date: Date

    @Column()
    last_updated_by : string

}