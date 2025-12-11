import "dotenv/config";
import { sequelize } from "../config/db";
import { Product } from "../models/product.model";
import { syncModels } from "../models";

async function run() {
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
  } catch (err) {
    console.error("❌ Seed failed", err);
  } finally {
    await sequelize.close();
  }
}

run();
