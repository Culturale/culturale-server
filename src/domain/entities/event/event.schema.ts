import { Schema, model } from 'mongoose';

import type { IEvent } from './event.interface';

const EventSchema = new Schema({
  adress: { required: true, type: String },
  chat: { required: true, type: Schema.Types.ObjectId, ref: 'Chat' },
  codi: { required: true, type: Number },
  dataFi: { required: true, type: Date },
  dataIni: { required: true, type: Date },
  denominacio: { required: true, type: String },
  descripcio: { required: true, type: String },
  horari: { required: true, type: String },
  url: { required: true, type: String },
  valoracions: {
    required: false,
    type: [Schema.Types.ObjectId],
    model: 'Review',
  },
  participants: {
    required: false,
    type: [Schema.Types.ObjectId],
    model: 'User',
  },
  lat: { required: false, type: Number },
  long: { required: false, type: Number },
  price: { required: false, type: String },
  photo: { required: false, type: String },
});

const EventModel = model<IEvent>('Event', EventSchema);

export { EventModel };
