import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerContacts } from './customer-contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerContactsService {

    constructor( 
        @InjectRepository(CustomerContacts)
        private  cusconserv : Repository<CustomerContacts>
        ){}

        async findall():Promise<CustomerContacts[]> {
                const customerContacts = await this.cusconserv.find();
                return customerContacts || []; 
        }

        async findOne(contact_id: string): Promise<CustomerContacts> {
                return await this.cusconserv.findOne({ where:{contact_id}});         
        }

        async create(contact: CustomerContacts): Promise<CustomerContacts> {
                return await this.cusconserv.save(contact);
        }

        async update(customer_id: string, contact:Partial <CustomerContacts>): Promise<CustomerContacts> {
            
            const update = this.cusconserv.update(customer_id,contact);
            return await this.cusconserv.findOne({where : {customer_id}});

        }

        async delete(contact_id: string): Promise<void> {
            await this.cusconserv.delete(contact_id);
        }
    
    
    
    
}
