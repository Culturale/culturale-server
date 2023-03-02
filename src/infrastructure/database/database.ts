import { connect } from 'mongoose';
import { IDatabase } from './database.interface';

export class Database implements IDatabase {
  constructor() {
    connect('');
  }
}
