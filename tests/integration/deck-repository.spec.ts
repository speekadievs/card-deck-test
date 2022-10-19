import { test } from '@japa/runner'
import DeckRepository from 'App/Repositories/DeckRepository'
import DeckModel from 'App/Models/Deck'
import DeckFactory from 'App/Factories/DeckFactory'
import { v4 as uuidv4 } from 'uuid'
import CardFactory from 'App/Factories/CardFactory'

test.group('Deck Repository', () => {
  const repository = new DeckRepository(DeckModel)

  const deckId = uuidv4()

  const deck = DeckFactory.create(deckId, 'FULL', false, [
    CardFactory.create(uuidv4(), deckId, 'ACE', 'SPADES', 'AS'),
  ])

  test('can create a new deck', async ({ assert }) => {
    assert.doesNotThrows(async () => {
      await repository.store(deck)
    })
  })

  test('returns null if incorrect ID provided', async ({ assert }) => {
    const firstResult = await repository.findByIdWithCards('false-id')

    assert.equal(firstResult, null)

    const secondResult = await repository.findByIdWithCards('false-id')

    assert.equal(secondResult, null)
  })

  test('returns deck object with remaining card amount', async ({ assert }) => {
    const result = await repository.findByIdWithCardCount(deckId)

    assert.equal(result?.deckId, deck.deckId)
    assert.equal(result?.type, deck.type)
    assert.equal(result?.shuffled, deck.shuffled)
    assert.equal(result?.remaining, 1)
  })

  test('returns deck object with remaining card objects', async ({ assert }) => {
    const result = await repository.findByIdWithCards(deckId)

    assert.equal(result?.deckId, deck.deckId)
    assert.equal(result?.cards.length, deck.cards.length)
    assert.equal(result?.cards[0].value, deck.cards[0].value)
    assert.equal(result?.cards[0].suit, deck.cards[0].suit)
    assert.equal(result?.cards[0].code, deck.cards[0].code)
  })
})
