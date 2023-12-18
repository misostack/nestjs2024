import { BaseEntity, generateEntityTableName } from '@modules/database/helpers';
import { Column, Entity } from 'typeorm';

@Entity({
  name: generateEntityTableName('plans'),
})
export class Plan extends BaseEntity<Plan> {
  // fields
  @Column('varchar', { length: 75 })
  name: string;

  @Column('varchar', { length: 250 })
  description: string;
}
