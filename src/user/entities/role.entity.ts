import { BaseEntity, generateEntityTableName } from '@modules/database/helpers';
import { Column, Entity, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity({
  name: generateEntityTableName('roles'),
})
export class Role extends BaseEntity<Role> {
  @Column('varchar', { length: 160, nullable: false })
  name: string;
  @Column('varchar', { length: 255, nullable: false })
  description: string;
  @OneToMany(() => RolePermission, (rp) => rp.role)
  rolePermissions: RolePermission[];
}
