import { test } from '@japa/runner'

test('create a new full deck', async ({ client }) => {
  const response = await client.post(`/decks`).json({
    type: 'FULL',
    shuffled: true,
  })

  response.assertStatus(200)
  response.assert!.equal(response.body().type, 'FULL')
  response.assert!.equal(response.body().shuffled, true)
  response.assert!.equal(response.body().remaining, 52)
})

test('create a new short deck', async ({ client }) => {
  const response = await client.post(`/decks`).json({
    type: 'SHORT',
    shuffled: true,
  })

  response.assertStatus(200)
  response.assert!.equal(response.body().type, 'SHORT')
  response.assert!.equal(response.body().shuffled, true)
  response.assert!.equal(response.body().remaining, 32)
})

test('fail to create a new deck with incorrect type', async ({ client }) => {
  const response = await client.post(`/decks`).json({
    type: 'UNKNOWN',
    shuffled: true,
  })

  response.assertStatus(422)
})

test('fail to create a new deck with incorrect shuffle type', async ({ client }) => {
  const response = await client.post(`/decks`).json({
    type: 'FULL',
    shuffled: 7,
  })

  response.assertStatus(422)
})
