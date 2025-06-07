import { Router } from "express";
import { requireFile, upload } from "../../config/cloudinary.config";
import {
  createNewProduct,
  createReview,
  deleteById,
  getAllProducts,
  getProductById,
  updateById,
} from "../../services/products.services";
import { hasRole } from "../../middlewares/hasRole.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { productSchema } from "../../validations/products.validation";
import { isAuthorized } from "../../middlewares/hasEmail.middleware";
import { isRatingValid } from "../../middlewares/isRatingValid.middleware";
const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  upload.single("image"),
  requireFile,
  validate(productSchema),
  createNewProduct
);
productRouter.delete("/:id", hasRole, deleteById);
productRouter.put("/:id", upload.single("image"), hasRole, updateById);
productRouter.post("/:id/reviews", isAuthorized, isRatingValid, createReview);

export default productRouter;
