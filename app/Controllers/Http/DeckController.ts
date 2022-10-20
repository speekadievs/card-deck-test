import { inject } from '@adonisjs/fold'
import { DeckRepositoryInterface } from '@ioc:Repositories/DeckRepository'
import { DeckServiceInterface } from '@ioc:Services/DeckService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeckNotFoundException from 'App/Exceptions/DeckNotFoundException'
import CreateDeckValidator from 'App/Validators/CreateDeckValidator'
import NoCardsToDrawException from 'App/Exceptions/NoCardsToDrawException'
import DrawCardValidator from 'App/Validators/DrawCardValidator'

@inject(['Repositories/DeckRepository', 'Services/DeckService'])
export default class DeckController {
  constructor(private repository: DeckRepositoryInterface, private service: DeckServiceInterface) {}

  public async open({ request }: HttpContextContract) {
    const deck = await this.repository.findByIdWithCards(request.param('id'))

    if (deck === null) {
      throw new DeckNotFoundException('Deck not found', 404, 'E_DECK_NOT_FOUND')
    }

    return deck.serialize()
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreateDeckValidator)

    const deck = await this.service.create(payload.type, payload.shuffled)

    return deck.serialize()
  }

  public async draw({ request }: HttpContextContract) {
    const deck = await this.repository.findByIdWithCardCount(request.param('id'))

    if (deck === null) {
      throw new DeckNotFoundException('Deck not found', 404, 'E_DECK_NOT_FOUND')
    }

    await request.validate(DrawCardValidator)

    if (deck.remaining <= 0) {
      throw new NoCardsToDrawException('No cards to draw', 400, 'E_NO_CARDS')
    }

    const cards = await this.service.draw(deck, parseInt(request.input('amount', 1)))

    return {
      cards: cards.map((card) => card.serialize()),
    }
  }
}
