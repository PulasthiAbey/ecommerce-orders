import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface OrderAttributes {
  id: number;
  orderDescription: string;
  createdAt?: Date;
}

interface OrderCreationAttributes
  extends Optional<OrderAttributes, "id" | "createdAt"> {}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public orderDescription!: string;
  public createdAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderDescription: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: false,
  }
);
