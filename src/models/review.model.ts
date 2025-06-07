import mongoose from "mongoose";

export type IReview = {
  email: string;
  rating: number;
  comment: string;
};

export const reviewSchema = new mongoose.Schema({
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});
