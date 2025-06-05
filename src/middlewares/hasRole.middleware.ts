import { NextFunction, Request, Response } from "express";

export const hasRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers["role"];
  if (role !== "admin") {
    res.status(401).json({ error: "Permition denied" });
    return;
  }
  next();
};
