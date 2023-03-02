import { Database, IDatabase } from './database';
import { IInfrastructure } from './infrastructure.interface';

export class Infrastructure implements IInfrastructure {
  public readonly database: IDatabase;

  constructor() {
    this.database = new Database();
  }
}
