import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Address {
  
  @PrimaryGeneratedColumn("uuid")
  address_id: string;

  @Column()
  customer_id : string

  @Column()
  address1 : string

  @Column("simple-json")
  additional_address_info: { key1: string; key2: string }

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date

  @Column()
  created_by : string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: Date

  @Column()
  last_updated_by : string

 
}
