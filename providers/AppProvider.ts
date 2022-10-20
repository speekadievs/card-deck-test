import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    await this.registerRepositories()
    await this.registerServices()
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

  private async registerRepositories() {
    const DeckModel = (await import('App/Models/Deck')).default
    const DeckRepository = (await import('App/Repositories/DeckRepository')).default

    this.app.container.bind('Repositories/DeckRepository', () => new DeckRepository(DeckModel))
  }

  private async registerServices() {
    const CardService = (await import('App/Services/CardService')).default
    const DeckService = (await import('App/Services/DeckService')).default

    this.app.container.bind('Services/DeckService', () => {
      return new DeckService(
        this.app.container.use('Repositories/DeckRepository'),
        new CardService()
      )
    })
  }
}
