import { BaseEntity, generateEntityTableName } from '@modules/database/helpers';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity({
  name: generateEntityTableName('permissions'),
})
@Index('UNQ_permissions_name', ['name'], { unique: true })
export class Permission extends BaseEntity<Permission> {
  @Column('varchar', { length: 255, nullable: false })
  name: string;
  @Column('varchar', { length: 255, nullable: true, default: '' })
  description: string;
  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions: RolePermission[];
}
