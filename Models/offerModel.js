import sequelize from "../Config/database.js";
import { DataTypes } from "sequelize";

const Offer = sequelize.define("Offer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Offer;
