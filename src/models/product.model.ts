import mongoose, { Schema, Document } from "mongoose";
import { IReview, reviewSchema } from "./review.model";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  review: IReview[];
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    review: {
      type: [reviewSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("hvProducts", productSchema);
