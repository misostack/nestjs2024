import { LoginAttempt } from '@modules/auth/entities/login-attempt';
import { DB_CHARSET, DB_PREFIX, DB_URL } from '@modules/config';
import { Plan } from '@modules/plan/entities/plan.entity';
import { Permission } from '@modules/user/entities/permission.entity';
import { RolePermission } from '@modules/user/entities/role-permission.entity';
import { Role } from '@modules/user/entities/role.entity';
import { User } from '@modules/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

// defined entities
const ENTITIES = [Plan, User, Role, Permission, RolePermission, LoginAttempt];

const dirname = __dirname;

const DatabaseConfig = {
  type: 'mysql',
  url: DB_URL,
  entities: ENTITIES,
  // MYSQL will store Timestamp in GMT ( UTC = 0)
  timezone: 'Z', // must have this, if the response date will be marked as current timezone
  charset: DB_CHARSET,
  // must not be synchronize automaticall, use data migration instea
  synchronize: false,
  // migrations
  migrations: [`${dirname}/migrations/*.ts`],
  migrationsTableName: `${DB_PREFIX}_migrations`,
  // cli
  cli: {
    migrationsDir: `${dirname}/migrations`,
  },
};

const DataSourceInstance = new DataSource(DatabaseConfig as DataSourceOptions);

export { DatabaseConfig };

export default DataSourceInstance;
