import sequelize from "../Config/database.js";
import { DataTypes } from "sequelize";

const GroceryProduct = sequelize.define("GroceryProduct", {
  groceryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default GroceryProduct;
