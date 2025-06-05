"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
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
exports.validate = validate;
