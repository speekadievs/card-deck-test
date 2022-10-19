import { CardServiceInterface } from '@ioc:Services/CardService'
import { CardConfig } from 'Contracts/cards'

export default class CardService implements CardServiceInterface {
  public getFullDeckCards(): CardConfig[] {
    return CardService.list().filter((card) => card.decks.includes('FULL'))
  }

  public getShortDeckCards(): CardConfig[] {
    return CardService.list().filter((card) => card.decks.includes('SHORT'))
  }

  // source: https://stackoverflow.com/a/2450976/4066921
  public shuffle(cards: CardConfig[]): CardConfig[] {
    let currentIndex = cards.length
    let randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]]
    }

    return cards
  }

  private static list(): CardConfig[] {
    return require('../../database/config/cards.json')
  }
}
