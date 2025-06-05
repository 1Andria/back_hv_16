"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = void 0;
const hasRole = (req, res, next) => {
    const role = req.headers["role"];
    if (role !== "admin") {
        res.status(401).json({ error: "Permition denied" });
        return;
    }
    next();
};
exports.hasRole = hasRole;
