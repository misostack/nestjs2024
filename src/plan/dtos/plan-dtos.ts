import { PlanStatus } from '../constants/plan-constants';

export class PlanDto {
  id: number;
  name: string;
  description: string;
  status: PlanStatus;
}
