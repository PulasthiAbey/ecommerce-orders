import { sequelize } from "../config/db";
import { Product } from "../models/product.model";
import { syncModels } from "../models";

export async function runSeed() {
  try {
    await sequelize.authenticate();
    await syncModels();

    await Product.bulkCreate(
      [
        {
          id: 1,
          productName: "HP laptop",
          productDescription: "This is HP laptop",
        },
        {
          id: 2,
          productName: "lenovo laptop",
          productDescription: "This is lenovo",
        },
        { id: 3, productName: "Car", productDescription: "This is Car" },
        { id: 4, productName: "Bike", productDescription: "This is Bike" },
      ],
      { ignoreDuplicates: true }
    );

    console.log("✅ Seed complete");
    return { success: true, message: "Seed completed" };
  } catch (err) {
    console.error("❌ Seed failed", err);
    throw err;
  }
}
