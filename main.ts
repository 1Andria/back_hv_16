import express from "express";
import { connectToDb } from "./src/config/connectToDb";
import productRouter from "./src/routes/products/product.router";

const app = express();
app.use(express.json());

connectToDb();

app.get("/", (req, res) => {
  res.send("Hello worlddd");
});
app.use("/products", productRouter);

app.listen(4000, () => {
  console.log("Running on http://localhost:4000");
});
