// sync.js
import sequelize from '../database-configuration/database.js'
import Grocery from './groceryModel.js';
import Offers from './offerModel.js';
import Category from './categoryModel.js';
import Products from './productModel.js';


Grocery.hasMany(Category, { foreignKey: 'id', as: 'categories' });
Category.belongsTo(Grocery, { foreignKey: 'id', as: 'grocery' });

Products.belongsTo(Category, { foreignKey: 'CategoryID', as: 'category' });
Products.belongsTo(Grocery, { foreignKey: 'StoreID', as: 'grocery' });

Offers.belongsTo(Products, { foreignKey: 'ProductID', as: 'product' });





sequelize.sync()
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch((err) => {
    console.error('Error creating tables:', err);
  });


  
export default { Grocery, Offers , Category, Products};