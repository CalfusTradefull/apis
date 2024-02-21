import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @ApiProperty({ example: 'Admin', description: 'Name of the role' })
  role_name: string;

  @ApiProperty({ example: 'Admin', description: 'Code representing the role' })
  role_name_cd: string;

  @ApiProperty({ example: 'ACTIVE', description: 'Status of the role' })
  role_status: string;

  @ApiProperty({ example: '2024-02-14', description: 'Start date of role activation' })
  active_start_dt: string;

  @ApiProperty({ example: '2025-02-14', description: 'End date of role activation' })
  active_end_dt: string;

  @ApiProperty({ example: { key1: 'value', key2: 'value' } })
  additional_role_info: Record<string, any>;

  @ApiProperty({ example: 'Admin', description: 'Name of the user who created the role' })
  created_by: string;

  @ApiProperty({ example: 'Admin', description: 'Name of the user who last updated the role' })
  last_updated_by: string;
}

export interface mockRoleDTO {
  role_name: string;
  role_name_cd: string;
  role_status: string;
  active_start_dt: string;
  active_end_dt: string;
  additional_role_info: Record<string, any>;
  created_by: string;
  last_updated_by: string;
  role_id: string;
  create_date: string;
  last_update_date: string;
}