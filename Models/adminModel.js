import sequelize from "../Config/database.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";

const Admin = sequelize.define("Admin", {
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
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
    validate: {
      notNull: { msg: "password is required" },
      notEmpty: { msg: "password must not be empty" },
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "superAdmin"),
    allowNull: false,
    defaultValue: "admin",
  },
});

export default Admin;
