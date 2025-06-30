import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1678886400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'email', type: 'varchar', unique: true },
          { name: 'password', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'stories',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'user_id', type: 'uuid' },
          { name: 'current_version', type: 'int', default: 1 },
          { name: 'status', type: 'varchar', default: 'draft' }, // e.g., draft, completed, published
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          { columnNames: ['user_id'], referencedColumnNames: ['id'], referencedTableName: 'users', onDelete: 'CASCADE' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'story_versions',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'story_id', type: 'uuid' },
          { name: 'version_number', type: 'int' },
          { name: 'content', type: 'jsonb' }, // Store story data (text, elements, choices) as JSONB
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          { columnNames: ['story_id'], referencedColumnNames: ['id'], referencedTableName: 'stories', onDelete: 'CASCADE' },
        ],
        indices: [
          { columnNames: ['story_id', 'version_number'], isUnique: true },
        ],
      }),
    );

    // More tables for characters, media assets, etc., would be added here
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('story_versions');
    await queryRunner.dropTable('stories');
    await queryRunner.dropTable('users');
  }
}
