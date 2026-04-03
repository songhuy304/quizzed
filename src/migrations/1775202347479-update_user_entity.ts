import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntity1775202347479 implements MigrationInterface {
  name = 'UpdateUserEntity1775202347479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "post" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
  }
}
