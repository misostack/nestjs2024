import { UserRepository } from './../../user/repositories/user-repository';
import { RolePermissionRepository } from './../../user/repositories/role-permission-repository';
import Seeder from '../core/seeder';
import { PlanRepository } from '@modules/plan/repositories/plan-repository';
import { Plan } from '@modules/plan/entities/plan.entity';
import { RoleRepository } from '@modules/user/repositories/role-repository';
import { Role } from '@modules/user/entities/role.entity';
import { PermissionRepository } from '@modules/user/repositories/permission-repository';
import { Permission } from '@modules/user/entities/permission.entity';
import { RolePermission } from '@modules/user/entities/role-permission.entity';
import { User } from '@modules/user/entities/user.entity';
import { UserStatus } from '@modules/user/constants/user-constants';
import { LoginAttemptRepository } from '@modules/auth/repositories/login-attempt-repository';

export default class V1Seed extends Seeder {
  public async run(): Promise<any> {
    // create roles
    const roleRepository = this.appInstance.get(RoleRepository);
    const permissionRepository = this.appInstance.get(PermissionRepository);
    const rolePermissionRepository = this.appInstance.get(
      RolePermissionRepository,
    );
    const userRepository = this.appInstance.get(UserRepository);
    const planRepository = this.appInstance.get(PlanRepository);
    const loginAttemptRepository = this.appInstance.get(LoginAttemptRepository);

    const roles = await roleRepository.save([
      { id: 1, name: 'Admin', description: 'system manage' },
      { id: 2, name: 'User', description: 'system user' },
    ]);
    console.log(roles);
    // create permissions
    const permissions = await permissionRepository.save([
      new Permission({
        id: 1,
        name: 'Users_RetrieveUser',
        description: 'retrieve user',
      }),
      new Permission({
        id: 2,
        name: 'Users_CreateUser',
        description: 'create user',
      }),
      new Permission({
        id: 3,
        name: 'Users_UpdateUser',
        description: 'update user',
      }),
      new Permission({
        id: 4,
        name: 'Users_DeleteUser',
        description: 'delete user',
      }),

      new Permission({
        id: 5,
        name: 'MyAccount_ManagePlan',
        description: 'user can manage their plan',
      }),
    ]);
    console.log(permissions);
    // create role and permission relation
    await rolePermissionRepository.save([
      // admin can manage users, create their own plans
      new RolePermission({
        role: new Role({ id: 1 }),
        permission: new Permission({ id: 1 }),
      }),
      new RolePermission({
        role: new Role({ id: 1 }),
        permission: new Permission({ id: 2 }),
      }),
      new RolePermission({
        role: new Role({ id: 1 }),
        permission: new Permission({ id: 3 }),
      }),
      new RolePermission({
        role: new Role({ id: 1 }),
        permission: new Permission({ id: 4 }),
      }),
      new RolePermission({
        role: new Role({ id: 1 }),
        permission: new Permission({ id: 5 }),
      }),
      // user
      new RolePermission({
        role: new Role({ id: 2 }),
        permission: new Permission({ id: 5 }),
      }),
    ]);
    // create user with specific role
    await userRepository.save([
      new User({
        id: 1,
        fullname: 'Cty TNHH MTV JSBase',
        username: 'jsbase',
        email: 'jsbase@yopmail.com',
        password: '123456',
        status: UserStatus.Active,
        roleId: 1,
      }),
      new User({
        id: 2,
        fullname: 'Cty TNHH MTV Pybase',
        username: 'pybase',
        email: 'pybase@yopmail.com',
        password: '123456',
        status: UserStatus.Active,
        roleId: 2,
      }),
    ]);
    // create user's plans

    await planRepository.save([
      new Plan({
        name: 'Plan 2000',
        description: 'Plan from 2000',
        userId: 1,
        startDate: new Date(2000, 1, 1),
        dueDate: new Date(2000, 12, 31, 23, 59, 59, 999),
      }),
      new Plan({
        name: 'Plan 2001',
        description: 'Plan from 2001',
        userId: 1,
        startDate: new Date(2001, 1, 1),
        dueDate: new Date(2001, 12, 31, 23, 59, 59, 999),
      }),
      new Plan({
        name: 'Plan 2000',
        description: 'Plan from 2000',
        userId: 2,
        startDate: new Date(2000, 1, 1),
        dueDate: new Date(2000, 12, 31, 23, 59, 59, 999),
      }),
      new Plan({
        name: 'Plan 2001',
        description: 'Plan from 2001',
        userId: 2,
        startDate: new Date(2001, 1, 1),
        dueDate: new Date(2001, 12, 31, 23, 59, 59, 999),
      }),
    ]);
    // login attempt
    await loginAttemptRepository.save([
      {
        userId: 1,
        userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`,
        loginAt: new Date(2001, 12, 31, 23, 59, 59, 999),
      },
    ]);
  }
}
