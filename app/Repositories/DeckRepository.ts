import Repository from 'App/Repositories/Repository'
import DeckModel from 'App/Models/Deck'
import { DeckRepositoryInterface } from '@ioc:Repositories/DeckRepository'
import Deck from 'App/ValueObjects/Deck'
import DeckFactory from 'App/Factories/DeckFactory'
import Database from '@ioc:Adonis/Lucid/Database'
import CardFactory from 'App/Factories/CardFactory'
import Card from 'App/ValueObjects/Card'
import { validate as uuidValidate } from 'uuid'

export default class DeckRepository
  extends Repository<typeof DeckModel>
  implements DeckRepositoryInterface
{
  public async store(deck: Deck, cards?: Card[]): Promise<void> {
    await Database.transaction(async (trx) => {
      // We use the generic query builder here as using the Lucid ORM produces individual insert
      // queries for the cards

      await trx.insertQuery().table(this.getModel().table).insert({
        id: deck.deckId,
        type: deck.type,
        shuffled: deck.shuffled,
      })

      if (cards && cards.length) {
        await trx
          .insertQuery()
          .table(this.getModel().$getRelation('cards').relatedModel().table)
          .multiInsert(
            cards.map((card) => ({
              id: card.id,
              deck_id: card.deckId,
              value: card.value,
              suit: card.suit,
              code: card.code,
            }))
          )
      }

      await trx.commit()
    })
  }

  public async findById(deckId: string): Promise<Deck | null> {
    if (!uuidValidate(deckId)) {
      return null
    }

    const deck = await this.getModel().query().where('id', deckId).first()

    if (!deck) {
      return null
    }

    return DeckFactory.createFromLucid(deck)
  }

  public async findByIdWithCardCount(deckId: string): Promise<Deck | null> {
    if (!uuidValidate(deckId)) {
      return null
    }

    const deck = await this.getModel().query().where('id', deckId).withCount('cards').first()

    if (!deck) {
      return null
    }

    return DeckFactory.createFromLucid(deck)
  }

  public async findByIdWithCards(deckId: string): Promise<Deck | null> {
    if (!uuidValidate(deckId)) {
      return null
    }

    const deck = await this.getModel().query().where('id', deckId).preload('cards').first()

    if (!deck) {
      return null
    }

    return DeckFactory.createFromLucid(deck, deck.cards.map(CardFactory.createFromLucid))
  }

  public async deleteAndReturnCards(deckId: string, amount: number): Promise<Card[]> {
    const cards = await Database.transaction(async (trx) => {
      const table = this.getModel().$getRelation('cards').relatedModel().table

      const cards = await trx
        .from(table)
        .forUpdate()
        .where('deck_id', deckId)
        .orderBy('order', 'asc')
        .limit(amount)

      await trx
        .from(this.getModel().$getRelation('cards').relatedModel().table)
        .whereIn(
          'id',
          cards.map((card) => card.id)
        )
        .delete()

      return cards
    })

    return (cards || []).map((card) => CardFactory.createFromLucid(card))
  }
}
