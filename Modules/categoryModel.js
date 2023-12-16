import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../database-configuration/database.js'



const Category = sequelize.define('category', {
  CategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StoreID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Category',
  timestamps: false,
});




export default Category;
