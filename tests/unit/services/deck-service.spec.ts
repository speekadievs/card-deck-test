import { test } from '@japa/runner'
import CardService from 'App/Services/CardService'
import DeckService from 'App/Services/DeckService'
import Deck, { DeckType } from 'App/ValueObjects/Deck'
import Card from 'App/ValueObjects/Card'

test.group('Deck Service', () => {
  const decks: Deck[] = []

  const service = new DeckService(
    {
      store: async (deck: Deck, cards?: Card[]) => {
        deck.cards = cards!

        decks.push(deck)
      },

      findById: async (deckId: string) => {
        const deck = decks.find((deck) => deck.deckId === deckId)

        if (!deck) {
          return null
        }

        return deck
      },

      findByIdWithCardCount: async (deckId: string) => {
        const deck = decks.find((deck) => deck.deckId === deckId)

        if (!deck) {
          return null
        }

        return deck
      },

      findByIdWithCards: async (deckId: string) => {
        const deck = decks.find((deck) => deck.deckId === deckId)

        if (!deck) {
          return null
        }

        return deck
      },

      deleteAndReturnCards: async (deckId: string, amount: number) => {
        const deck = decks.find((deck) => deck.deckId === deckId)

        return deck!.cards.splice(0, amount)
      },
    },
    new CardService()
  )

  let deck: Deck

  test('can create a new full deck', async ({ assert }) => {
    deck = await service.create(DeckType.FULL, false)

    assert.equal(deck.type, DeckType.FULL)
    assert.equal(deck.shuffled, false)
    assert.equal(deck.remaining, 52)
  })

  test('can create a new short deck', async ({ assert }) => {
    deck = await service.create(DeckType.SHORT, false)

    assert.equal(deck.type, DeckType.SHORT)
    assert.equal(deck.shuffled, false)
    assert.equal(deck.remaining, 32)
  })

  test('can draw cards from a deck', async ({ assert }) => {
    const cards = await service.draw(deck, 2)

    assert.equal(cards.length, 2)
  })
})
