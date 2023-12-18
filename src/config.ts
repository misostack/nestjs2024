import 'dotenv/config';

type NodeEnv = 'development' | 'test' | 'production';
const supportNodeEnviroments = {
  development: 'development',
  test: 'test',
  production: 'production',
};
const PORT: number = parseInt(process.env.PORT) || 3000;
const DB_URL: string = process.env.DB_URL;
const DB_CHARSET: string = 'utf8mb4_unicode_ci';
const DB_PREFIX: string = 'nestjs';
const NODE_ENV: NodeEnv =
  supportNodeEnviroments[process.env.NODE_ENV] || 'production';

// check required env params
const requiredVariables = { DB_URL };
Reflect.ownKeys(requiredVariables).map((key) => {
  if (!requiredVariables[key]) {
    throw new Error(
      `${key.toString()} is required! Please recheck your configuration`,
    );
  }
});

export { PORT, NODE_ENV, DB_URL, DB_CHARSET, DB_PREFIX };
