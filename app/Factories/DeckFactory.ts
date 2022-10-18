import DeckModel from 'App/Models/Deck'
import Deck from 'App/DataObjects/Deck'

export default class DeckFactory {
  public static createFromLucid(model: DeckModel): Deck {
    return new Deck({
      deckId: model.id,
      type: model.type,
      shuffled: model.shuffled,
      remaining: model.$extras?.cards_count,
    })
  }
}
