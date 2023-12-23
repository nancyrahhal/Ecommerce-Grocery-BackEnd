import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../database-configuration/database.js'



const Grocery = sequelize.define('groceries', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  StoreName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OwnerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PhoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Grocery',
});


export default Grocery;


