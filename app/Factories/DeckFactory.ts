import DeckModel from 'App/Models/Deck'
import Deck, { DeckType } from 'App/ValueObjects/Deck'
import Card from 'App/ValueObjects/Card'

export default class DeckFactory {
  public static create(
    id: string,
    type: DeckType,
    shuffled: boolean,
    cards?: Card[],
    remaining?: number
  ) {
    return new Deck({
      deckId: id,
      type,
      shuffled,
      remaining: cards?.length || remaining || 0,
      cards,
    })
  }

  public static createFromLucid(model: DeckModel, cards?: Card[]): Deck {
    return new Deck({
      deckId: model.id,
      type: model.type,
      shuffled: model.shuffled,
      remaining: model.$extras?.cards_count || cards?.length || 0,
      cards,
    })
  }
}
