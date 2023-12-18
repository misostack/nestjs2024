import { Inject, Injectable } from '@nestjs/common';
import { PlanRepository } from './plan/repositories/plan-repository';

@Injectable()
export class AppService {
  constructor(@Inject(PlanRepository) private planRepository: PlanRepository) {}
  getHello(): Promise<any> {
    return this.planRepository.find();
  }
}
