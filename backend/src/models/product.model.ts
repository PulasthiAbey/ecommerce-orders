import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export interface ProductAttributes {
  id: number;
  productName: string;
  productDescription?: string | null;
}

export class Product
  extends Model<ProductAttributes>
  implements ProductAttributes
{
  public id!: number;
  public productName!: string;
  public productDescription?: string | null;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);
