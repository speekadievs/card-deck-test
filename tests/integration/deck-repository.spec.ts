import { test } from '@japa/runner'
import DeckRepository from 'App/Repositories/DeckRepository'
import DeckModel from 'App/Models/Deck'
import DeckFactory from 'App/Factories/DeckFactory'
import { v4 as uuidv4 } from 'uuid'
import CardFactory from 'App/Factories/CardFactory'
import { DeckType } from 'App/ValueObjects/Deck'

test.group('Deck Repository', () => {
  const repository = new DeckRepository(DeckModel)

  const deckId = uuidv4()

  const deck = DeckFactory.create(deckId, DeckType.FULL, false)

  const cards = [
    CardFactory.create(uuidv4(), deckId, 'ACE', 'SPADES', 'AS'),
    CardFactory.create(uuidv4(), deckId, '2', 'SPADES', '2S'),
    CardFactory.create(uuidv4(), deckId, '3', 'SPADES', '3S'),
  ]

  test('can create a new deck', async ({ assert }) => {
    assert.doesNotThrows(async () => {
      await repository.store(deck, cards)
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
    assert.equal(result?.remaining, 3)
  })

  test('returns deck object with remaining card objects', async ({ assert }) => {
    const result = await repository.findByIdWithCards(deckId)

    assert.equal(result?.deckId, deck.deckId)
    assert.equal(result?.cards.length, cards.length)
    assert.equal(result?.cards[0].value, cards[0].value)
    assert.equal(result?.cards[0].suit, cards[0].suit)
    assert.equal(result?.cards[0].code, cards[0].code)
  })

  test('deletes and returns card objects', async ({ assert }) => {
    const cards = await repository.deleteAndReturnCards(deckId, 2)
    const deck = await repository.findByIdWithCardCount(deckId)

    assert.equal(cards.length, 2)
    assert.equal(deck?.remaining, 1)
  })
})
