import { NODE_ENV } from '@modules/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './datasource';
import { DataSourceOptions } from 'typeorm';
import { PlanRepository } from '@modules/plan/repositories/plan-repository';
import { UserRepository } from '@modules/user/repositories/user-repository';
import { RoleRepository } from '@modules/user/repositories/role-repository';
import { PermissionRepository } from '@modules/user/repositories/permission-repository';
import { RolePermissionRepository } from '@modules/user/repositories/role-permission-repository';
import { LoginAttemptRepository } from '@modules/auth/repositories/login-attempt-repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(DatabaseConfig as DataSourceOptions),
      autoLoadEntities: false,
      logging: NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    }),
  ],
  providers: [
    PlanRepository,
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    LoginAttemptRepository,
  ],
  exports: [
    PlanRepository,
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    LoginAttemptRepository,
  ],
})
export class DatabaseModule {}
