import { Router } from "express";
import { Product } from "../models";

const router = Router();

router.get("/products", async (_req, res) => {
  try {
    const products = await Product.findAll({ order: [["id", "ASC"]] });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;
