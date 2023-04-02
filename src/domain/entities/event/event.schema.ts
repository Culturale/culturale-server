import { Schema, model } from 'mongoose';

import type { User } from '../user';

import type { IEvent } from './event.interface';

const EventSchema = new Schema({
  adress: { required: false, type: String },
  chat: { required: true, type: Schema.Types.ObjectId, ref: 'Chat' },
  codi: { required: true, type: Number },
  aforament: {required: true, type: Number},
  categoria: {required: true, type: String},
  dataFi: { required: true, type: Date },
  dataIni: { required: true, type: Date },
  denominacio: { required: true, type: String },
  descripcio: { required: true, type: String },
  horari: { required: false, type: String },
  latitud: {required: true, type: Number},
  longitud: {required: true, type: Number},
  telefon: {required: true, type: Number},
  url: { required: true, type: String },
  assistents: {required: true, type: Array<User>},
});

const EventModel = model<IEvent>('Event', EventSchema);

export { EventModel };
