"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "any.required": "სრული სახელი აუცილებელია",
    }),
    category: joi_1.default.string().required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "any.required": "პროდუქტის კატეგორია აუცილებელია აუცილებელია",
    }),
    description: joi_1.default.string().required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "any.required": "პროდუქტის აღწერა აუცილებელია",
    }),
    price: joi_1.default.number().required().messages({
        "number.base": "მხოლოდ რიცხვს ველოდები",
        "any.required": "აუცილებელია ფასის გადმოცემა",
    }),
});
exports.productSchema = productSchema;
