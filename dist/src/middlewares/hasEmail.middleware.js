"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const isAuthorized = (req, res, next) => {
    const email = req.headers["email"];
    if (!email || typeof email !== "string" || !email.includes("@")) {
        res.status(401).json({ error: "Invalid or missing email" });
        return;
    }
    next();
};
exports.isAuthorized = isAuthorized;
