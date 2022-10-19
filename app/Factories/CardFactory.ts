import CardModel from 'App/Models/Card'
import Card from 'App/ValueObjects/Card'

export default class CardFactory {
  public static create(id: string, deckId: string, value: string, suit: string, code: string) {
    return new Card({
      id,
      deckId,
      value,
      suit,
      code,
    })
  }

  public static createFromLucid(model: CardModel): Card {
    return new Card({
      id: model.id,
      deckId: model.deckId,
      value: model.value,
      suit: model.suit,
      code: model.code,
    })
  }
}
