import sequelize from "../Config/database.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "username is required" },
      notEmpty: { msg: "username must not be empty" },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (!value) {
        throw new Error("password must not be empty");
      }
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
    validate: {
      notNull: { msg: "password is required" },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "phoneNumber is required" },
      notEmpty: { msg: "phoneNumber must not be empty" },
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

export default User;
