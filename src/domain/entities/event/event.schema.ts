import { Schema, model } from "mongoose";

import type { IEvent } from "./event.interface";

const EventSchema = new Schema({
    denominacio: { required: true, type: String },
    descripcio: { required: true, type: String },
});

const EventModel = model<IEvent>("Event", EventSchema);

export { EventModel };
