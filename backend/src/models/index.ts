import { sequelize } from "../config/db";
import { Order } from "./order.model";
import { Product } from "./product.model";
import { OrderProduct } from "./orderProduct.model";

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId",
  otherKey: "productId",
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
  otherKey: "orderId",
});

Order.hasMany(OrderProduct, { foreignKey: "orderId" });
OrderProduct.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderProduct, { foreignKey: "productId" });
OrderProduct.belongsTo(Product, { foreignKey: "productId" });

export async function syncModels() {
  await sequelize.sync({ alter: true });
  console.log("✅ Models synced");
}

export { Order, Product, OrderProduct, sequelize };
