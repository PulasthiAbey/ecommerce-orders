import { Router } from "express";
import { Order, OrderProduct, Product } from "../models";

const router = Router();

router.get("/order", async (_req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderProduct,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ message: "Invalid id" });

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          include: [Product],
        },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { orderDescription, productIds } = req.body as {
      orderDescription: string;
      productIds: number[];
    };

    if (!orderDescription || !Array.isArray(productIds)) {
      return res
        .status(400)
        .json({ message: "orderDescription and productIds are required" });
    }

    const order = await Order.create({ orderDescription });

    const mappings = productIds.map((productId) => ({
      orderId: order.id,
      productId,
    }));

    await OrderProduct.bulkCreate(mappings);

    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderProduct,
          include: [Product],
        },
      ],
    });

    res.status(201).json(fullOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

router.put("/orders/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ message: "Invalid id" });

    const { orderDescription, productIds } = req.body as {
      orderDescription?: string;
      productIds?: number[];
    };

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (orderDescription) {
      order.orderDescription = orderDescription;
      await order.save();
    }

    if (Array.isArray(productIds)) {
      await OrderProduct.destroy({ where: { orderId: id } });

      const mappings = productIds.map((productId) => ({
        orderId: id,
        productId,
      }));

      await OrderProduct.bulkCreate(mappings);
    }

    const fullOrder = await Order.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          include: [Product],
        },
      ],
    });

    res.json(fullOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order" });
  }
});

router.delete("/orders/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ message: "Invalid id" });

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await OrderProduct.destroy({ where: { orderId: id } });
    await order.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
