import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1775461983947 implements MigrationInterface {
  name = 'CreateUserTable1775461983947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_entity_role_enum" AS ENUM('USER', 'ADMIN', 'MODERATOR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_5d1a3df5505df438cd2ad3b0025" UNIQUE ("userName"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_role_enum"`);
  }
}
