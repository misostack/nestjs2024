import { BaseEntity, generateEntityTableName } from '@modules/database/helpers';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserStatus } from '../constants/user-constants';
import { Role } from './role.entity';

@Entity({
  name: generateEntityTableName('users'),
})
@Index('UNQ_users_username', ['username'], { unique: true })
@Index('UNQ_users_email', ['email'], { unique: true })
export class User extends BaseEntity<User> {
  @Column('varchar', { length: 255, nullable: false })
  fullname: string;
  @Column('varchar', { length: 255, nullable: false })
  username: string;
  @Column('varchar', { length: 255, nullable: false })
  email: string;
  @Column('varchar', { length: 60, nullable: true })
  password: string;
  @Column('tinyint', { nullable: true, default: UserStatus.Active })
  status: number;
  @ManyToOne(() => Role, (role) => role.id, { nullable: false })
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'FK_users_role_id_roles_id',
  })
  roleId: number;
}
