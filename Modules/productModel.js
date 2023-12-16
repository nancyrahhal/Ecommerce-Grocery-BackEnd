import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../database-configuration/database.js'



const Products = sequelize.define('product', {
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  StoreID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NewPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ItsOffer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'Products',
  timestamps: false,
});

export default Products;