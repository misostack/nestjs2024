import { NODE_ENV } from '@modules/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './datasource';
import { DataSourceOptions } from 'typeorm';
import { PlanRepository } from '@modules/plan/repositories/plan-repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(DatabaseConfig as DataSourceOptions),
      autoLoadEntities: false,
      logging: NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    }),
  ],
  providers: [PlanRepository],
  exports: [PlanRepository],
})
export class DatabaseModule {}
