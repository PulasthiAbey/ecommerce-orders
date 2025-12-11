import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.routes";
import productsRouter from "./routes/products.routes";
import seedRouter from "./routes/seed.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "ecommerce-orders-backend",
    env: process.env.NODE_ENV || "development",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", ordersRouter);
app.use("/api", productsRouter);
app.use("/api/seed", seedRouter);

export default app;
