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
exports.createReview = exports.updateById = exports.deleteById = exports.createNewProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const mongoose_1 = require("mongoose");
const cloudinary_config_1 = require("../config/cloudinary.config");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (typeof req.query.category === "string") {
        filter.category = req.query.category;
    }
    if (req.query.search) {
        filter.name = { $regex: new RegExp(String(req.query.search), "i") };
    }
    let sort = {};
    if (req.query.price === "asc") {
        sort.price = 1;
    }
    else if (req.query.price === "desc") {
        sort.price = -1;
    }
    const page = parseInt(String(req.query.page)) || 1;
    const limit = Math.min(parseInt(String(req.query.limit)) || 30, 100);
    const skip = (page - 1) * limit;
    const products = yield product_model_1.default
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    res.json(products);
});
exports.getAllProducts = getAllProducts;
// 2) პაგინაცია
//    * ამოიღეთ limit და page query პარამეტრებით.
//    * მაგ.: /products?page=2&limit=10 დააბრუნებს მეორე გვერდს, 10 პროდუქტს.
//    * გაითვალისწინეთ ზედა ზღვარი, დიფოლტად უნდა წამოიღოს 30 პროდუქტი
//    * პაგინაცია უნდა გაკეთდეს ბექის მხარეს არ გამოიყნოთ slice მეთოდი
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
    var _a;
    const { name, description, price, category } = req.body;
    const product = yield product_model_1.default.create({
        name,
        description,
        price,
        category,
        image: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path,
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
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const email = req.headers.email;
    const { rating, comment } = req.body;
    const product = yield product_model_1.default.findByIdAndUpdate(id, {
        $push: {
            review: {
                email,
                rating,
                comment,
            },
        },
    }, { new: true });
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    res.status(200).json({ message: "Review created successfully", product });
});
exports.createReview = createReview;
