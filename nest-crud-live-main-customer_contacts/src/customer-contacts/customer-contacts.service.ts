import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerContacts } from './customer-contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerContactsService {

    constructor( 
        @InjectRepository(CustomerContacts)
        private readonly cusconserv : Repository<CustomerContacts>
        ){}

        async findall():Promise<CustomerContacts[]> {
            return await this.cusconserv.find();
        }

        async findOne(contact_id: string): Promise<CustomerContacts> {
            try{
                return await this.cusconserv.findOne({ where:{contact_id}})
            }
            catch(error){
                console.log(`error for creating customer contact is ${error}`);
            }
         
        }

        async create(contact: CustomerContacts): Promise<CustomerContacts> {
            // try {
                // const creates = this.cusconserv.create(contact);
                return await this.cusconserv.save(contact);
            // } catch (error) {
            //     return error
            // }
        }

        async update(customer_id: string, contact:Partial <CustomerContacts>): Promise<CustomerContacts> {
            const updates = this.cusconserv.update(customer_id,contact);
            return this.cusconserv.findOne({ where : {customer_id }})
        }

        async delete(contact_id: string): Promise<void> {
            await this.cusconserv.delete(contact_id);
        }
    
    
    
    
}
