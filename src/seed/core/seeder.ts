import { INestApplicationContext } from '@nestjs/common';

interface ISeeder {
  run(): Promise<any>;
}

class Seeder implements ISeeder {
  protected appInstance: INestApplicationContext;
  constructor(appInstance: INestApplicationContext) {
    this.appInstance = appInstance;
  }
  run(): Promise<any> {
    return;
  }
}

export default Seeder;
