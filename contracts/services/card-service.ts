declare module '@ioc:Services/CardService' {
  import { CardConfig } from 'Contracts/cards'

  export interface CardServiceInterface {
    getFullDeckCards(): CardConfig[]

    getShortDeckCards(): CardConfig[]

    shuffle(cards: CardConfig[]): CardConfig[]
  }

  const CardService: CardServiceInterface
  export default CardService
}
