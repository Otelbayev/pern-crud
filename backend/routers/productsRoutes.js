import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
