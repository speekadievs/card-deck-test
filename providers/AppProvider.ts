import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    const DeckModel = (await import('App/Models/Deck')).default
    const DeckRepository = (await import('App/Repositories/DeckRepository')).default

    this.app.container.bind('Repositories/DeckRepository', () => new DeckRepository(DeckModel))
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
