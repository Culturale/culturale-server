import { Schema, model } from "mongoose";

import type { IEvent } from "./event.interface";

const EventSchema = new Schema({
  adress: { required: false, type: String },
  dataFi: { required: true, type: Date },
  dataIni: { required: true, type: Date },
  denominacio: { required: true, type: String },
  descripcio: { required: true, type: String },
  horari: { required: false, type: String },
  url: { required: true, type: String },
});

const EventModel = model<IEvent>("Event", EventSchema);

export { EventModel };