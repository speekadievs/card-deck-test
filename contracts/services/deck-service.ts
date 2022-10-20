declare module '@ioc:Services/DeckService' {
  import Deck, { DeckType } from 'App/ValueObjects/Deck'
  import Card from 'App/ValueObjects/Card'

  export interface DeckServiceInterface {
    create(type: DeckType, shuffled: boolean): Promise<Deck>

    draw(deck: Deck, amount: number): Promise<Card[]>
  }

  const DeckService: DeckServiceInterface
  export default DeckService
}
