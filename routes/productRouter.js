import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Route to add a product, with image uploads and admin authorization
productRouter.post(
  "/add",
  adminAuth, // Ensures only an admin can add products
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct // Controller for adding product
);

// Route to remove a product, accessible only by admin
productRouter.delete("/remove", adminAuth, removeProduct);

// Route to list all products, no authentication required
productRouter.get("/listproduct", listProduct);

// Route to get a single product by ID
productRouter.get("/singleproduct", singleProduct);

export default productRouter;
