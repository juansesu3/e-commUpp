import { Schema, model, models } from "mongoose";

const reviewShema = new Schema(
  {
    title: String,
    description: String,
    stars: Number,
    product: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

export const Review = models?.Review || model("Review", reviewShema);
