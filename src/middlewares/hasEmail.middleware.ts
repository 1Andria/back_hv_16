import { NextFunction, Request, Response } from "express";
export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.headers["email"];
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(401).json({ error: "Invalid or missing email" });
    return;
  }

  next();
};
