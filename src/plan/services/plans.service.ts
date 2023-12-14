import { Injectable, Scope } from '@nestjs/common';
import { PlanDto } from '../dtos/plan-dtos';

const planDataMock: PlanDto[] = [new PlanDto()];

@Injectable({
  scope: Scope.DEFAULT,
})
export class PlansService {}
