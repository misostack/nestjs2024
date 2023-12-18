import { PlanRepository } from '@modules/plan/repositories/plan-repository';
import Seeder from '../core/seeder';
import { Plan } from '@modules/plan/entities/plan.entity';

export default class CreatePlans extends Seeder {
  public async run(): Promise<any> {
    const planRepository = this.appInstance.get(PlanRepository);
    await planRepository.save(
      new Plan({
        name: 'Plan 2000',
        description: 'Plan from 2000',
      }),
    );
  }
}
