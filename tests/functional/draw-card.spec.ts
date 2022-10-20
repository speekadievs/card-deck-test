import { test } from '@japa/runner'

test('drawing a card with no amount provided', async ({ client }) => {
  const deck = await client.post('/decks').json({
    type: 'FULL',
    shuffled: true,
  })

  const response = await client.patch(`/decks/${deck.body().deckId}`)

  response.assertStatus(200)
  response.assert!.equal(response.body().cards.length, 1)
})

test('drawing a card with an int based amount', async ({ client }) => {
  const deck = await client.post('/decks').json({
    type: 'FULL',
    shuffled: true,
  })

  const response = await client.patch(`/decks/${deck.body().deckId}`).json({
    amount: 2,
  })

  response.assertStatus(200)
  response.assert!.equal(response.body().cards.length, 2)
})

test('drawing a card with a float based amount', async ({ client }) => {
  const deck = await client.post('/decks').json({
    type: 'FULL',
    shuffled: true,
  })

  const response = await client.patch(`/decks/${deck.body().deckId}`).json({
    amount: 1.5,
  })

  response.assertStatus(200)
  response.assert!.equal(response.body().cards.length, 1)
})

test('drawing a card with a negative amount throws an error', async ({ client }) => {
  const deck = await client.post('/decks').json({
    type: 'FULL',
    shuffled: true,
  })

  const response = await client.patch(`/decks/${deck.body().deckId}`).json({
    amount: -2,
  })

  response.assertStatus(422)
})

test('drawing a card with a string based amount throws an error', async ({ client }) => {
  const deck = await client.post('/decks').json({
    type: 'FULL',
    shuffled: true,
  })

  const response = await client.patch(`/decks/${deck.body().deckId}`).json({
    amount: 'test',
  })

  response.assertStatus(422)
})

test('drawing a card from deck throws an error with status 404 when wrong ID provided', async ({
  client,
}) => {
  const response = await client.patch(`/decks/some-fake-id`)

  response.assertStatus(404)
  response.assertTextIncludes('E_DECK_NOT_FOUND')
})
