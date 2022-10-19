import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Card from 'App/Models/Card'
import { DeckType } from 'App/ValueObjects/Deck'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: DeckType

  @column()
  public shuffled: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Card)
  public cards: HasMany<typeof Card>
}
