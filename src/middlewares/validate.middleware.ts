import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body || {}, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({ error: error.details.map((er) => er.message) });
      return;
    }
    req.body = value;
    next();
  };
};
