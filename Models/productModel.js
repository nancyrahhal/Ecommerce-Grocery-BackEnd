import sequelize from "../Config/database.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Product name is required" },
      notEmpty: { msg: "Product name must not be empty" },
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Price is required" },
      notEmpty: { msg: "Price must not be empty" },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Image is required" },
      notEmpty: { msg: "Image must not be empty" },
    },
  },
  newPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "New price is required" },
      notEmpty: { msg: "New price must not be empty" },
    },
  },
  itsOffer: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      notNull: { msg: "Offer information is required" },
      notEmpty: { msg: "Offer information must not be empty" },
    },
  },
});

export default Product;
