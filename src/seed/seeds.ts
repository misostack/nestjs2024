import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SeedModule } from './seed.module';
import Seeder from './core/seeder';
import * as fg from 'fast-glob';

import { INestApplicationContext } from '@nestjs/common';

async function loadSeeds({
  patterns,
  appInstance,
}: {
  patterns: string | string[];
  appInstance: INestApplicationContext;
}) {
  const seeders = await fg.async(patterns, {});
  console.log({ seeders });
  console.log('seeders.length', seeders.length);
  for (const path of seeders) {
    const importedSeed = await import(path);
    if (importedSeed.default) {
      const seedInstance: Seeder = new importedSeed.default(appInstance);
      await seedInstance.run();
      console.log(
        `Seed [${importedSeed.default.name} in ${path}] had been run succesfully!`,
      );
    }
  }
}

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(SeedModule);
  const appInstance = app.select(SeedModule);
  const dataSource = appInstance.get(getDataSourceToken());
  const version = await dataSource.query(`SELECT VERSION() as 'version'`);
  console.log(version);
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.startTransaction();
  try {
    // execute some operations on this transaction:
    await loadSeeds({
      patterns: [
        fg.convertPathToPattern(`${__dirname}/seeds/*.seed.ts`),
        fg.convertPathToPattern(`${__dirname}/seeds/*.seed.js`),
      ],
      appInstance,
    });
    // commit transaction now:
    await queryRunner.commitTransaction();
  } catch (error) {
    // since we have errors let's rollback changes we made
    await queryRunner.rollbackTransaction();
    console.error('Seeds run failed!');
    console.error(error);
  } finally {
    console.error('Seeds run successfully!');
    // you need to release query runner which is manually created:
    await queryRunner.release();
  }
  // close dataSource
  dataSource.destroy();
}

main();
