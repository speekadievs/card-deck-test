import Repository from 'App/Repositories/Repository'
import DeckModel from 'App/Models/Deck'
import { DeckRepositoryInterface } from '@ioc:Repositories/DeckRepository'
import Deck from 'App/ValueObjects/Deck'
import DeckFactory from 'App/Factories/DeckFactory'
import Database from '@ioc:Adonis/Lucid/Database'
import CardFactory from 'App/Factories/CardFactory'

export default class DeckRepository
  extends Repository<typeof DeckModel>
  implements DeckRepositoryInterface
{
  public async store(deck: Deck): Promise<void> {
    await Database.transaction(async (trx) => {
      // We use the generic query builder here as using the Lucid ORM produces individual insert
      // queries for the cards

      await trx.insertQuery().table(this.getModel().table).insert({
        id: deck.deckId,
        type: deck.type,
        shuffled: deck.shuffled,
      })

      await trx
        .insertQuery()
        .table(this.getModel().$getRelation('cards').relatedModel().table)
        .multiInsert(
          deck.cards.map((card) => ({
            id: card.id,
            deck_id: card.deckId,
            value: card.value,
            suit: card.suit,
            code: card.code,
          }))
        )

      await trx.commit()
    })
  }

  public async findByIdWithCardCount(id: string) {
    const deck = await this.getModel().query().where('id', id).withCount('cards').first()

    if (!deck) {
      return null
    }

    return DeckFactory.createFromLucid(deck)
  }

  public async findByIdWithCards(id: string) {
    const deck = await this.getModel().query().where('id', id).preload('cards').first()

    if (!deck) {
      return null
    }

    return DeckFactory.createFromLucid(deck, deck.cards.map(CardFactory.createFromLucid))
  }
}
