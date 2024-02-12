import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserRole {
  
  @PrimaryGeneratedColumn("uuid")
  user_role_id: string;

  @Column()
  user_id : string

  @Column()
  role_id : string

  @Column()
  user_role_status : string

  @Column({ type: 'date' , default: () => 'NOW()'})
  active_start_dt : string

  @Column({ type: 'date' })
  active_end_dt : string

  @Column("simple-json")
  additional_role_info: { key1: string; key2: string }

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date

  @Column()
  created_by : string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_update_date: Date

  @Column()
  last_updated_by : string

 
}
