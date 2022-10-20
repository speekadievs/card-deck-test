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

      // SQLite will return this as a number, so we convert it to a boolean here
      shuffled: !!this.shuffled,

      remaining: this.remaining || 0,
      cards: this.cards?.map((card) => card.serialize()) || undefined,
    }
  }
}
