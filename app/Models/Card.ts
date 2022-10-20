import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Deck from 'App/Models/Deck'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public deckId: string

  @column()
  public order: number

  @column()
  public value: string

  @column()
  public suit: string

  @column()
  public code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Deck)
  public deck: BelongsTo<typeof Deck>
}
