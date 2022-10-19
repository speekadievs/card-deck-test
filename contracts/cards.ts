export interface CardType {
  value: string
  decks: string[]
}

export interface CardConfig extends CardType {
  suit: string
  code: string
}
