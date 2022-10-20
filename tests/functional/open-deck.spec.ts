import { test } from '@japa/runner'

test('open a deck', async ({ client }) => {
  const deck = await client.post('/decks').json({
    type: 'FULL',
    shuffled: true,
  })

  const response = await client.get('/decks/' + deck.body().deckId)

  response.assertStatus(200)
  response.assertBodyContains(deck.body())
  response.assert!.equal(response.body().cards.length, 52)
})

test('opening a deck throws an error with status 404 when wrong ID provided', async ({
  client,
}) => {
  const response = await client.get(`/decks/some-fake-id`)

  response.assertStatus(404)
  response.assertTextIncludes('E_DECK_NOT_FOUND')
})
