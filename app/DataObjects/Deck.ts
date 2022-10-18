import { DeckType } from '@ioc:Repositories/DeckRepository'
import DataObject from 'App/DataObjects/DataObject'

export default class Deck extends DataObject<Deck> {
  public deckId: string
  public type: DeckType
  public shuffled: boolean

  public remaining?: number
}
