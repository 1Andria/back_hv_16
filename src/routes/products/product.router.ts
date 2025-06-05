import { Router } from "express";
import { upload } from "../../config/cloudinary.config";
import {
  createNewProduct,
  deleteById,
  getAllProducts,
  getProductById,
  updateById,
} from "../../services/products.services";
import { hasRole } from "../../middlewares/hasRole.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { productSchema } from "../../validations/products.validation";
const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  upload.single("image"),
  validate(productSchema),
  createNewProduct
);
productRouter.delete("/:id", hasRole, deleteById);
productRouter.put("/:id", upload.single("image"), hasRole, updateById);

export default productRouter;
