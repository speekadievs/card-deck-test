declare module '@ioc:Repositories/DeckRepository' {
  import { RepositoryInterface } from 'Contracts/repositories/repository'
  import Deck from 'App/ValueObjects/Deck'
  import Card from 'App/ValueObjects/Card'

  export interface DeckRepositoryInterface extends RepositoryInterface {
    store(deck: Deck, cards?: Card[]): Promise<void>

    findById(deckId: string): Promise<Deck | null>

    findByIdWithCardCount(deckId: string): Promise<Deck | null>

    findByIdWithCards(deckId: string): Promise<Deck | null>

    deleteAndReturnCards(deckId: string, amount: number): Promise<Card[]>
  }

  const DeckRepository: DeckRepositoryInterface
  export default DeckRepository
}
