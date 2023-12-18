import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class PlanRepository extends Repository<Plan> {
  constructor(private dataSource: DataSource) {
    super(Plan, dataSource.createEntityManager());
  }
}
