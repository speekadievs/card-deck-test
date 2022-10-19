import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'decks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()

      table.string('type', 11)

      table.boolean('shuffled').defaultTo(false)

      table.timestamps({
        useTimestamps: true,
        defaultToNow: true,
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
