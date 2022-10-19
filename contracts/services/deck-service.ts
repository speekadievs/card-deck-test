declare module '@ioc:Services/DeckService' {
  import Deck, { DeckType } from 'App/ValueObjects/Deck'

  export interface DeckServiceInterface {
    create(type: DeckType, shuffled: boolean): Promise<Deck>
  }

  const DeckService: DeckServiceInterface
  export default DeckService
}
