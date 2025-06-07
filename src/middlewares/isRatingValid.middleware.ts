import { NextFunction, Request, Response } from "express";

export const isRatingValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rating, comment } = req.body;

  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    res.status(400).json({ error: "Rating should be in range of 1-5" });
    return;
  }
  if (!comment || typeof comment !== "string") {
    res.status(400).json({ error: "Invalid Comment" });
    return;
  }
  next();
};
