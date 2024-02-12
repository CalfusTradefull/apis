import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerContacts } from './customer-contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerContactsService {

    constructor( 
        @InjectRepository(CustomerContacts)
        private cusRepo : Repository<CustomerContacts>
        ){}

        async findall():Promise<CustomerContacts[]> {
            return await this.cusRepo.find();
        }

        async findOne(contact_id: string): Promise<CustomerContacts> {
         return await this.cusRepo.findOne({ where:{contact_id}})
        }

        async create(contact: CustomerContacts): Promise<CustomerContacts> {
            try {
                const creates = this.cusRepo.create(contact)
                // console.log('created customer', creates);
                return await this.cusRepo.save(creates);
            } catch (error) {
                // console.log(error);
                return error
            }
        }

        async update(customer_id: string, contact: CustomerContacts): Promise<CustomerContacts> {
            const updates = this.cusRepo.update(customer_id,contact);
            return this.cusRepo.findOne({ where : {customer_id }})
        }

        async delete(contact_id: string): Promise<void> {
           await this.cusRepo.delete(contact_id);
        }
    
    
    
    
}
