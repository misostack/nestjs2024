import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from './plan/plan.module';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [DatabaseModule, PlanModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
