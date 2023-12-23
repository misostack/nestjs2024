import { BaseEntity, generateEntityTableName } from '@modules/database/helpers';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PlanStatus } from '../constants/plan-constants';
import { User } from '@modules/user/entities/user.entity';

@Entity({
  name: generateEntityTableName('plans'),
})
export class Plan extends BaseEntity<Plan> {
  // fields
  @Column('varchar', { length: 75, nullable: false })
  name: string;

  @Column('varchar', { length: 1000, nullable: true, default: '' })
  description: string;

  @Column('tinyint', { nullable: true, default: PlanStatus.Active })
  status: number;

  @Column('timestamp', { name: 'start_date', nullable: false })
  startDate: Date;

  @Column('timestamp', { name: 'due_date', nullable: false })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_plans_user_id_users_id',
    referencedColumnName: 'id',
  })
  userId: number;
}
