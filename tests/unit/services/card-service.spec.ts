import { test } from '@japa/runner'
import CardService from 'App/Services/CardService'

test.group('Card Service', () => {
  const service = new CardService()

  test('can return a full deck', ({ assert }) => {
    const cards = service.getFullDeckCards()

    assert.equal(cards.length, 52)
  })

  test('can return a short deck', ({ assert }) => {
    const cards = service.getShortDeckCards()

    assert.equal(cards.length, 32)
  })

  test('can shuffle cards', ({ assert }) => {
    const cards = service.getFullDeckCards()

    const firstCard = cards[0]
    const lastCard = cards[cards.length - 1]

    const shuffled = service.shuffle(cards)

    assert.notEqual(shuffled[0], firstCard)
    assert.notEqual(shuffled[shuffled.length - 1], lastCard)
  })
})
