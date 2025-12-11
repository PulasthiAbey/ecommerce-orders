import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface OrderProductAttributes {
  id: number;
  orderId: number;
  productId: number;
}

interface OrderProductCreationAttributes
  extends Optional<OrderProductAttributes, "id"> {}

export class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
}

OrderProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_product_map",
    timestamps: false,
  }
);
