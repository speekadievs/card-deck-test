declare module '@ioc:Repositories/DeckRepository' {
  import { RepositoryInterface } from 'Contracts/repositories/repository'
  import Deck from 'App/DataObjects/Deck'

  export type DeckType = 'FULL' | 'SHORT'

  export interface DeckRepositoryInterface extends RepositoryInterface {
    create(type: DeckType, shuffled: boolean, cards): Promise<Deck>

    findByIdWithCardCount(id: string): Promise<Deck | null>

    findByIdWithCards(id: string): Promise<Deck | null>
  }

  const DeckRepository: DeckRepositoryInterface
  export default DeckRepository
}
