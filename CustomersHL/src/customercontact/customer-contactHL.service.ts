import { json } from 'stream/consumers';
import { AppConfig } from './../config/AppConfig';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CustomerContacts } from './customer-contactHL.dto';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';

@Injectable()
export class CustomerContactServiceHL {

    constructor(private http:HttpService, @Inject('APP_CONFIG') private appConfig :typeof AppConfig){}

    async getCustomerCustomers() {
        console.log(`Endpoint where ${this.appConfig.DAL_URL+'customer-contacts/all'}`)
        return await fetch(this.appConfig.DAL_URL+'customer-contacts/all')
            .then((res => {
                    if(res.status==200){
                        return res.json();
                    }
            }))
            .catch((error)=>{
                console.log(`error in get all is${error}`)
                throw  new ForbiddenException('Api not Found');
            })
    }

    async getCustomerCustomersById(customerId: string) {
        console.log(`Endpoint where ${this.appConfig.DAL_URL+'customer-contacts/findOne'}`)
        return await fetch(this.appConfig.DAL_URL+'customer-contacts/findOne/'.concat(customerId))
        .then((res => {
                if(res.status==200){
                    return res.json();
                }
        }))
        .catch(()=>{
            throw new ForbiddenException('Api not Found');
        })
        }

    async createCustomerCustomers(cusprefdto: CustomerContacts) {
        console.log(`Endpoint where ${this.appConfig.DAL_URL+'customer-contacts/create'}`)
        const url = this.appConfig.DAL_URL+'customer-contacts/create/';

        const CusHeader = {
            "Content-Type": "application/json",
        }
        return await fetch(url,{
            method:'Post',
            headers:CusHeader,
            body : JSON.stringify(cusprefdto)
        })
            .then((res => {
                    if(res.status==200){
                        return res.json();
                    }
            }))
            .catch((error)=>{
                console.log(`error for create is ${error}`);
                throw new ForbiddenException('Api not Found');
            });      
    }


    async updateCustomerCustomers(customerContactID: string, customerContactDto: Partial<CustomerContacts>): Promise<Partial<CustomerContacts>> {
        console.log(`Endpoint where ${this.appConfig.DAL_URL+'customer-contacts/update/'}`)
        const url = this.appConfig.DAL_URL+'customer-contacts/update/'.concat(customerContactID) ;
        const CusHeader = {
            "Content-Type": "application/json",
        }
    
        const response = await fetch(url, { 
            method: 'PUT',
            headers: CusHeader,
            body: JSON.stringify(customerContactDto)
        });
    
        if (response.status === 200 || response.status == 201) {
            console.log(`Inside updated HL`)
            const updatedUserResponse = await fetch(this.appConfig.DAL_URL + 'customer-contacts/findOne/' + customerContactID);
            const updatedUser = await updatedUserResponse.json();
            return updatedUser;
        } else {
            console.log(`Failed to update customer contact. Status: ${response.status}`);
            throw new Error(`Failed to update customer contact. Status: ${response.status}`);
        }
    };
    

    async deleteCustomerCustomers(customerContactID: string) {
        console.log(`Endpoint where ${this.appConfig.DAL_URL+'customer-contacts/delete/'}`);
        const url = this.appConfig.DAL_URL+'customer-contacts/delete/'.concat(customerContactID) ;
        // const CusHeader = {
        //     "Content-Type": "application/json",
        // }
        try{
        return await fetch(url,{method:'DELETE'})
        .then(async (res) => {
            if (res.status === 204 || res.status === 200) {
                // Check if the response is not empty
                if (res.headers.get('content-length') === '0') {
                    return { message: 'Customer contact deleted successfully' };
                }

                // Check if the response is valid JSON
                const text = await res.text();
                try {
                    const findUser = JSON.parse(text);
                    if (!findUser) {
                        return { message: 'Customer contact deleted successfully' };
                    } else {
                        throw new Error('Failed to delete customer contact. User still exists.');
                    }
                } catch (e) {
                    throw new Error('Failed to delete customer contact. Invalid JSON response.');
                }
            } else {
                throw new Error(`Failed to delete customer contact. Status: ${res.status}`);
            }
        })
            // .catch((error)=>{
            //     console.log(`error is ${error}`);
            //     throw new ForbiddenException('Api not Found');
            // })
            }
            catch(error){
                console.log(`error from HL service ${error}`)
            }
        }

    
}
