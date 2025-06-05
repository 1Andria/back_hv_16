"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToDb_1 = require("./src/config/connectToDb");
const product_router_1 = __importDefault(require("./src/routes/products/product.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connectToDb_1.connectToDb)();
app.get("/", (req, res) => {
    res.send("Hello worlddd");
});
app.use("/products", product_router_1.default);
app.listen(4000, () => {
    console.log("Running on http://localhost:4000");
});
