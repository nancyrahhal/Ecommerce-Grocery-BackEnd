import sequelize from "../Config/database.js";
import { DataTypes } from "sequelize";

const GroceryCategory = sequelize.define(
  "GroceryCategory",
  {
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        name: "grocery_category_unique_constraint",
        unique: true,
        fields: ["groceryId", "categoryName"],
      },
    ],
  }
);

export default GroceryCategory;
