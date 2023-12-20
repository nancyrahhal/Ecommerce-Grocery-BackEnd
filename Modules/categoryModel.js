import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../database-configuration/database.js'



const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StoreID: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, {
  tableName: 'Category',
});




export default Category;
