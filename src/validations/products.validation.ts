import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "any.required": "სრული სახელი აუცილებელია",
  }),
  category: Joi.string().required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "any.required": "პროდუქტის კატეგორია აუცილებელია აუცილებელია",
  }),
  description: Joi.string().required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "any.required": "პროდუქტის აღწერა აუცილებელია",
  }),
  price: Joi.number().required().messages({
    "number.base": "მხოლოდ რიცხვს ველოდები",
    "any.required": "აუცილებელია ფასის გადმოცემა",
  }),
});

export { productSchema };
