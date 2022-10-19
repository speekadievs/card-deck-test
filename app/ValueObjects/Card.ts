import ValueObject from 'App/ValueObjects/ValueObject'

export default class Card extends ValueObject<Card> {
  public id: string
  public deckId: string

  public value: string
  public suit: string
  public code: string

  public serialize(): {} {
    return {
      value: this.value,
      suit: this.suit,
      code: this.code,
    }
  }
}
