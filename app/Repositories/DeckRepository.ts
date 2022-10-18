import Repository from 'App/Repositories/Repository'
import DeckModel from 'App/Models/Deck'
import { v4 as uuidv4 } from 'uuid'
import { DeckRepositoryInterface, DeckType } from '@ioc:Repositories/DeckRepository'
import Deck from 'App/DataObjects/Deck'
import DeckFactory from 'App/Factories/DeckFactory'

export default class DeckRepository
  extends Repository<typeof DeckModel>
  implements DeckRepositoryInterface
{
  public async create(type: DeckType, shuffled: boolean, cards): Promise<Deck> {
    const deck = await this.getModel().create({
      id: uuidv4(),
      type,
      shuffled,
    })

    await deck.related('cards').createMany(cards)

    return DeckFactory.createFromLucid(deck)
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

    return DeckFactory.createFromLucid(deck)
  }
}
