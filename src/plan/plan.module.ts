import { Module } from '@nestjs/common';
import { PlansController } from './controllers/plans.controller';
import { PlansService } from './services/plans.service';

@Module({
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlanModule {}
