declare module '@ioc:Repositories/DeckRepository' {
  import { RepositoryInterface } from 'Contracts/repositories/repository'
  import Deck, { DeckType } from 'App/ValueObjects/Deck'

  export interface DeckRepositoryInterface extends RepositoryInterface {
    store(deck: Deck): Promise<void>

    findByIdWithCardCount(id: string): Promise<Deck | null>

    findByIdWithCards(id: string): Promise<Deck | null>
  }

  const DeckRepository: DeckRepositoryInterface
  export default DeckRepository
}
