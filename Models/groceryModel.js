import sequelize from "../Config/database.js";
import { DataTypes } from "sequelize";

const Grocery = sequelize.define("Grocery", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  storeName: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false,
    validate: {
      notNull: { msg: "StoreName is required" },
      notEmpty: { msg: "StoreName must not be empty" },
    },
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "PhoneNumber is required" },
      notEmpty: { msg: "PhoneNumber must not be empty" },
    },
  },
  storeImage:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "image is required" },
      notEmpty: { msg: "image must not be empty" },
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "City is required" },
      notEmpty: { msg: "City must not be empty" },
    },
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Area is required" },
      notEmpty: { msg: "Area must not be empty" },
    },
  },

  //Location
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -18000,
      max: 18000,
    },
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -9000,
      max: 9000,
    },
  },
});

export default Grocery;
