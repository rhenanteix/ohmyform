import { QueryRunner } from 'typeorm'
import { SqliteMigration } from '../sqlite.migration'

export class onboardingCompleted1699999999999 extends SqliteMigration {
  name = 'onboardingCompleted1699999999999'

  public async realUp(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD COLUMN "onboardingCompleted" boolean NOT NULL DEFAULT (0)',
    )
  }

  public async realDown(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "onboardingCompleted"')
  }
}
