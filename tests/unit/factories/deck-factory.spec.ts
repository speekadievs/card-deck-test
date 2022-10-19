import { test } from '@japa/runner'
import DeckModel from 'App/Models/Deck'
import DeckFactory from 'App/Factories/DeckFactory'
import Deck from 'App/ValueObjects/Deck'

test.group('Deck Factory', () => {
  test('can create deck value object', ({ assert }) => {
    const deck = DeckFactory.create('deck-id', 'FULL', true)

    assert.instanceOf(deck, Deck)
    assert.equal(deck.deckId, 'deck-id')
    assert.equal(deck.type, 'FULL')
    assert.equal(deck.shuffled, true)
  })

  test('can create deck value object from lucid model', ({ assert }) => {
    const model = new DeckModel()

    model.id = 'deck-id'
    model.type = 'FULL'
    model.shuffled = true

    const deck = DeckFactory.createFromLucid(model)

    assert.instanceOf(deck, Deck)
    assert.equal(deck.deckId, 'deck-id')
    assert.equal(deck.type, 'FULL')
    assert.equal(deck.shuffled, true)
  })
})
