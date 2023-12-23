import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../database-configuration/database.js'



const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role:{
      type: DataTypes.ENUM('Admin', 'superAdmin'),
      allowNull: false,
      defaultValue: 'Admin',
  }

});



export default Admin;


