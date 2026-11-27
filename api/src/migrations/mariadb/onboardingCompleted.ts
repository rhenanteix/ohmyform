import { MigrationInterface, QueryRunner } from 'typeorm'

export class onboardingCompleted1699999999999 implements MigrationInterface {
  name = 'onboardingCompleted1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` ADD `onboardingCompleted` tinyint NOT NULL DEFAULT 0')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `onboardingCompleted`')
  }
}
