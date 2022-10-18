import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { RepositoryInterface } from 'Contracts/repositories/repository'

export default class Repository<T extends typeof BaseModel> implements RepositoryInterface {
  constructor(private model: T) {}

  protected getModel(): T {
    return this.model
  }
}
