import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.routes";
import productsRouter from "./routes/products.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", ordersRouter);
app.use("/api", productsRouter);

export default app;
