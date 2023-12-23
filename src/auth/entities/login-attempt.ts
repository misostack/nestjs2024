import { BaseEntity, generateEntityTableName } from '@modules/database/helpers';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';

@Entity({
  name: generateEntityTableName('login_attempts'),
})
export class LoginAttempt extends BaseEntity<LoginAttempt> {
  @Column('text', {
    name: 'user_agent',
    nullable: true,
  })
  userAgent: string;

  @Column('timestamp', { name: 'login_at', nullable: false })
  loginAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_login_attempts_user_id_users_id',
    referencedColumnName: 'id',
  })
  userId: number;
}
