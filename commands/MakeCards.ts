import { BaseCommand } from '@adonisjs/core/build/standalone'

import * as fs from 'fs'
import { CardConfig, CardType } from 'Contracts/cards'

export default class MakeCards extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:cards'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Make a list of card objects and save them to a JSON file'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public suits: string[] = ['SPADES', 'CLUBS', 'DIAMONDS', 'HEARTS']

  public cards: CardType[] = [
    {
      value: 'ACE',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: '2',
      decks: ['FULL'],
    },
    {
      value: '3',
      decks: ['FULL'],
    },
    {
      value: '4',
      decks: ['FULL'],
    },
    {
      value: '5',
      decks: ['FULL'],
    },
    {
      value: '6',
      decks: ['FULL'],
    },
    {
      value: '7',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: '8',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: '9',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: '10',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: 'JACK',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: 'QUEEN',
      decks: ['SHORT', 'FULL'],
    },
    {
      value: 'KING',
      decks: ['SHORT', 'FULL'],
    },
  ]

  public async run() {
    this.logger.info('Generating cards')

    const cards = this.suits.reduce((total, suit) => {
      total = total.concat(
        this.cards.map((card) => {
          return this.format(card, suit)
        })
      )

      return total
    }, [] as CardConfig[])

    this.logger.info('Saving the JSON')

    this.save(cards)
  }

  private format(card: CardType, suit: string) {
    return {
      value: card.value,
      suit: suit,
      code: this.getCode(card.value, suit),
      decks: card.decks,
    }
  }

  private getCode(card: string, suit: string): string {
    return isNaN(+card) ? card.at(0)! + suit.at(0) : card + suit.at(0)
  }

  private save(cards: CardConfig[]) {
    const dir = `${process.cwd()}/database/config`

    fs.mkdirSync(dir, {
      recursive: true,
    })

    fs.writeFileSync(`${dir}/cards.json`, JSON.stringify(cards, null, 2))
  }
}
