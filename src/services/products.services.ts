import { Request, Response, Router } from "express";
import productModel from "../models/product.model";
import { isValidObjectId } from "mongoose";
import { deleteFromCloudinary } from "../config/cloudinary.config";

type ProductFilter = Partial<{
  category: string;
  name: { $regex: RegExp };
}>;

type ProductSort = Partial<{
  price: 1 | -1;
}>;

const getAllProducts = async (req: Request, res: Response) => {
  const filter: ProductFilter = {};
  if (typeof req.query.category === "string") {
    filter.category = req.query.category;
  }
  if (req.query.search) {
    filter.name = { $regex: new RegExp(String(req.query.search), "i") };
  }
  let sort: ProductSort = {};
  if (req.query.price === "asc") {
    sort.price = 1;
  } else if (req.query.price === "desc") {
    sort.price = -1;
  }
  const page = parseInt(String(req.query.page)) || 1;
  const limit = Math.min(parseInt(String(req.query.limit)) || 30, 100);
  const skip = (page - 1) * limit;
  const products = await productModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  res.json(products);
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: "Wrong ID is provided" });
    return;
  }
  const products = await productModel.findById(id);
  res.json(products);
};

const createNewProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;
  const product = await productModel.create({
    name,
    description,
    price,
    category,
    image: req?.file?.path,
  });

  res.status(201).json({ message: "Created successfully", product });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: "Wrong ID is provided" });
    return;
  }
  const product = await productModel.findById(id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  if (product.image) {
    const fileName = product.image.split("uploads/")[1];
    const fileId = fileName.split(".")[0];
    const publicFileId = `uploads/${fileId}`;
    await deleteFromCloudinary(publicFileId);
  }

  const deletedProduct = await productModel.findByIdAndDelete(id);
  res.json({ message: "Product deleted successfully", data: deletedProduct });
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: "Wrong ID is provided" });
    return;
  }

  const { name, description, price, category } = req.body;

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  if (req.file) {
    const fileName = product.image.split("uploads/")[1];
    const fileId = fileName.split(".")[0];
    const publicFileId = `uploads/${fileId}`;
    await deleteFromCloudinary(publicFileId);
  }

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
      image: req?.file?.path,
      $inc: { __v: 1 },
    },
    { new: true }
  );
  res.json({ message: "Product updated successfully", data: updatedProduct });
};

const createReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const email = req.headers.email as string;
  const { rating, comment } = req.body;
  const product = await productModel.findByIdAndUpdate(
    id,
    {
      $push: {
        review: {
          email,
          rating,
          comment,
        },
      },
    },
    { new: true }
  );

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json({ message: "Review created successfully", product });
};

export {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteById,
  updateById,
  createReview,
};
