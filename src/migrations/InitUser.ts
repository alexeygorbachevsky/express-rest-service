import { MigrationInterface, QueryRunner } from 'typeorm';
import { v1 as uuid } from 'uuid';

const bcrypt = require('bcryptjs');

export class InitUser implements MigrationInterface {
  name = 'Init9926646635513';

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (id, name, login, password) VALUES ('${uuid()}', 'admin', 'admin', '${bcrypt.hashSync(
        'admin',
        10
      )}')`
    );
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
