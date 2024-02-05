import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  user_name : string

  @Column()
  first_name : string

  @Column()
  last_name : string

  @Column()
  middle_name : string

  @Column()
  email_address : string

  @Column()
  phone_number : string

  @Column("simple-json")
  additional_user_info: { key1: string; key2: string }

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date

  @Column()
  created_by : string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: Date

  @Column()
  last_updated_by : string

 
}
