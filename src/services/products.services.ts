import { Request, Response, Router } from "express";
import productModel from "../models/product.model";
import { isValidObjectId } from "mongoose";
import { deleteFromCloudinary } from "../config/cloudinary.config";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productModel.find();
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

  if (!req.file) {
    res.status(400).json({ error: "Image is required" });
    return;
  }
  const product = await productModel.create({
    name,
    description,
    price,
    category,
    image: req.file.path,
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

export {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteById,
  updateById,
};
