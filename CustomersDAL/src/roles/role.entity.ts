import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1', description: 'Unique identifier of the role' })
  role_id: string;

  @Column()
  @ApiProperty({ example: 'Admin', description: 'Name of the role' })
  role_name: string;

  @Column()
  @ApiProperty({ example: 'Admin', description: 'Code representing the role' })
  role_name_cd: string;

  @Column()
  @ApiProperty({ example: 'Active', description: 'Status of the role' })
  role_status: string;

  @Column({ type: 'date', default: () => 'NOW()' })
  @ApiProperty({ example: '2024-02-14', description: 'Start date of role activation' })
  active_start_dt: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-02-14', description: 'End date of role activation' })
  active_end_dt: string;

  @Column('simple-json')
  @ApiProperty({
    example: { key1: 'value1', key2: 'value2' },
    description: 'Additional information related to the role',
  })
  additional_role_info: { key1: string; key2: string };

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2024-02-14T12:00:00.000Z', description: 'Date when the role was created' })
  create_date: Date;

  @Column()
  @ApiProperty({ example: 'Admin', description: 'Name of the user who created the role' })
  created_by: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2024-02-14T12:00:00.000Z', description: 'Date when the role was last updated' })
  last_update_date: Date;

  @Column()
  @ApiProperty({ example: 'Admin', description: 'Name of the user who last updated the role' })
  last_updated_by: string;
}
