"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRatingValid = void 0;
const isRatingValid = (req, res, next) => {
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
exports.isRatingValid = isRatingValid;
