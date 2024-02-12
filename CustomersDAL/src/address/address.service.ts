import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  // get all addresss
  async findall(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  // get one address
  async findOne(address_id: string): Promise<Address> {
    return await this.addressRepository.findOne({ where : { address_id } });
  }

  // get one address
  async findByCustomerID(customer_id: string): Promise<Address> {
    return await this.addressRepository.findOne({ where : { customer_id } })
  }

  //create address
  async create(address: Address): Promise<Address> {
    const newAddress = this.addressRepository.create(address);
    return await this.addressRepository.save(newAddress);
  }

  // update address
  async update(address_id: string, address: Address): Promise<Address> {
    await this.addressRepository.update(address_id, address);
    return await this.addressRepository.findOne( { where : { address_id} } );
  }

  // delete address
  async delete(address_id: string): Promise<void> {
    await this.addressRepository.delete(address_id);
  }
}
