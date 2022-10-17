import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Card from 'App/Models/Card'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: 'FULL' | 'SHORT'

  @column()
  public shuffled: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Card)
  public cards: HasMany<typeof Card>
}
