import sequelize from "../Config/database.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "categoryName is required" },
      notEmpty: { msg: "categoryName must not be empty" },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "image is required" },
      notEmpty: { msg: "image must not be empty" },
    },
  },
});

export default Category;
