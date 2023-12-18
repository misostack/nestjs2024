import { DB_PREFIX } from '@modules/config';
import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class BaseEntity<T> extends TypeOrmBaseEntity {
  constructor(payload: Partial<T>) {
    super();
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

const generateEntityTableName = (entityName: string) => {
  return `${DB_PREFIX}_${entityName}`.toLowerCase();
};

export { BaseEntity, generateEntityTableName };
