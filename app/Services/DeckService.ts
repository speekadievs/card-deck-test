import { DeckServiceInterface } from '@ioc:Services/DeckService'
import { DeckRepositoryInterface } from '@ioc:Repositories/DeckRepository'
import Deck, { DeckType } from 'App/ValueObjects/Deck'
import { CardServiceInterface } from '@ioc:Services/CardService'
import { CardConfig } from 'Contracts/cards'
import { v4 as uuidv4 } from 'uuid'
import DeckFactory from 'App/Factories/DeckFactory'
import CardFactory from 'App/Factories/CardFactory'
import Card from 'App/ValueObjects/Card'

export default class DeckService implements DeckServiceInterface {
  constructor(
    private repository: DeckRepositoryInterface,
    private cardService: CardServiceInterface
  ) {}

  public async create(type: DeckType, shuffled: boolean): Promise<Deck> {
    let items: CardConfig[]

    switch (type) {
      case DeckType.FULL:
        items = this.cardService.getFullDeckCards()
        break
      case DeckType.SHORT:
        items = this.cardService.getShortDeckCards()
        break
    }

    if (shuffled) {
      items = this.cardService.shuffle(items)
    }

    const deckId = uuidv4()

    const deck = DeckFactory.create(deckId, type, shuffled)

    const cards = items.map((card) => {
      return CardFactory.create(uuidv4(), deckId, card.value, card.suit, card.code)
    })

    await this.repository.store(deck, cards)

    deck.remaining = cards.length

    return deck
  }

  public async draw(deck: Deck, amount: number): Promise<Card[]> {
    const cards = this.repository.deleteAndReturnCards(deck.deckId, amount)

    return cards
  }
}
