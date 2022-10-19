import { test } from '@japa/runner'
import CardFactory from 'App/Factories/CardFactory'
import CardModel from 'App/Models/Card'
import Card from 'App/ValueObjects/Card'

test.group('Card Factory', () => {
  test('can create card value object', ({ assert }) => {
    const card = CardFactory.create('card-id', 'deck-id', 'ACE', 'SPADES', 'AS')

    assert.instanceOf(card, Card)
    assert.equal(card.id, 'card-id')
    assert.equal(card.deckId, 'deck-id')
    assert.equal(card.value, 'ACE')
    assert.equal(card.suit, 'SPADES')
    assert.equal(card.code, 'AS')
  })

  test('can create card value object from lucid model', ({ assert }) => {
    const model = new CardModel()

    model.id = 'card-id'
    model.deckId = 'deck-id'
    model.value = 'ACE'
    model.suit = 'SPADES'
    model.code = 'AS'

    const card = CardFactory.createFromLucid(model)

    assert.instanceOf(card, Card)
    assert.equal(card.id, 'card-id')
    assert.equal(card.deckId, 'deck-id')
    assert.equal(card.value, 'ACE')
    assert.equal(card.suit, 'SPADES')
    assert.equal(card.code, 'AS')
  })
})
