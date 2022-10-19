import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()

      table.uuid('deck_id').references('id').inTable('decks').onDelete('CASCADE')

      table.string('value', 11)
      table.string('suit', 11)
      table.string('code', 3)

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
