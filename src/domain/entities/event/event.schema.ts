import { Schema, model } from "mongoose";

import type { IEvent } from "./event.interface";

const EventSchema = new Schema({
  denominacio: { required: true, type: String },
  descripcio: { required: true, type: String },
  dataIni: { required: true, type: Date },
  dataFi: { required: true, type: Date },
  horari: { required: false, type: String },
  adress: { required: false, type: String },
  url: { required: true, type: String },
});

const EventModel = model<IEvent>("Event", EventSchema);

export { EventModel };
