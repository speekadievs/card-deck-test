import { DeckServiceInterface } from '@ioc:Services/DeckService'
import { DeckRepositoryInterface } from '@ioc:Repositories/DeckRepository'
import Deck, { DeckType } from 'App/ValueObjects/Deck'
import { CardServiceInterface } from '@ioc:Services/CardService'
import { CardConfig } from 'Contracts/cards'
import { v4 as uuidv4 } from 'uuid'
import DeckFactory from 'App/Factories/DeckFactory'
import CardFactory from 'App/Factories/CardFactory'

export default class DeckService implements DeckServiceInterface {
  constructor(
    private repository: DeckRepositoryInterface,
    private cardService: CardServiceInterface
  ) {}

  public async create(type: DeckType, shuffled: boolean): Promise<Deck> {
    let cards: CardConfig[]

    switch (type) {
      case DeckType.FULL:
        cards = this.cardService.getFullDeckCards()
        break
      case DeckType.SHORT:
        cards = this.cardService.getShortDeckCards()
        break
    }

    if (shuffled) {
      cards = this.cardService.shuffle(cards)
    }

    const deckId = uuidv4()

    const deck = DeckFactory.create(
      deckId,
      type,
      shuffled,
      cards.map((card) => {
        return CardFactory.create(uuidv4(), deckId, card.value, card.suit, card.code)
      })
    )

    await this.repository.store(deck)

    return deck
  }
}
