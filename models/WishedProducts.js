import { Schema, model, models } from "mongoose";

const WishedProductsSchema = new Schema({
  userEmail: { type: String, required: true },
  product: { type: Schema.Types.ObjectId },
});

export const WishedProduct =
  models?.WishedProduct || model("WishedProduct", WishedProductsSchema);
