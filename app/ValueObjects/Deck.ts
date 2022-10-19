import ValueObject from 'App/ValueObjects/ValueObject'
import Card from 'App/ValueObjects/Card'

export enum DeckType {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

export default class Deck extends ValueObject<Deck> {
  public deckId: string
  public type: DeckType
  public shuffled: boolean

  public remaining: number
  public cards: Card[]

  public serialize(): {} {
    return {
      deckId: this.deckId,
      type: this.type,
      shuffled: this.shuffled,

      remaining: this.remaining || 0,
      cards: this.cards?.map((card) => card.serialize()) || undefined,
    }
  }
}
