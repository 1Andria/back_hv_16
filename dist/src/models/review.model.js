"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.reviewSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
});
