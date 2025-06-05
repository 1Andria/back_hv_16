"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.deleteById = exports.createNewProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const mongoose_1 = require("mongoose");
const cloudinary_config_1 = require("../config/cloudinary.config");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find();
    res.json(products);
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: "Wrong ID is provided" });
        return;
    }
    const products = yield product_model_1.default.findById(id);
    res.json(products);
});
exports.getProductById = getProductById;
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category } = req.body;
    if (!req.file) {
        res.status(400).json({ error: "Image is required" });
        return;
    }
    const product = yield product_model_1.default.create({
        name,
        description,
        price,
        category,
        image: req.file.path,
    });
    res.status(201).json({ message: "Created successfully", product });
});
exports.createNewProduct = createNewProduct;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: "Wrong ID is provided" });
        return;
    }
    const product = yield product_model_1.default.findById(id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    if (product.image) {
        const fileName = product.image.split("uploads/")[1];
        const fileId = fileName.split(".")[0];
        const publicFileId = `uploads/${fileId}`;
        yield (0, cloudinary_config_1.deleteFromCloudinary)(publicFileId);
    }
    const deletedProduct = yield product_model_1.default.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully", data: deletedProduct });
});
exports.deleteById = deleteById;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: "Wrong ID is provided" });
        return;
    }
    const { name, description, price, category } = req.body;
    const product = yield product_model_1.default.findById(id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    if (req.file) {
        const fileName = product.image.split("uploads/")[1];
        const fileId = fileName.split(".")[0];
        const publicFileId = `uploads/${fileId}`;
        yield (0, cloudinary_config_1.deleteFromCloudinary)(publicFileId);
    }
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path,
        $inc: { __v: 1 },
    }, { new: true });
    res.json({ message: "Product updated successfully", data: updatedProduct });
});
exports.updateById = updateById;
