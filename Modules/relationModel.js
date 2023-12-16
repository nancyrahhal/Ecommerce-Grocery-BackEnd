// sync.js
import sequelize from '../database-configuration/database.js'
import Grocery from './groceryModel.js';
import Offers from './offerModel.js';
import Category from './categoryModel.js';
import Products from './productModel.js';


Category.hasOne(Products, { foreignKey: 'CategoryID' });
Products.belongsTo(Category, { foreignKey: 'CategoryID' });

Offers.belongsTo(Products, { foreignKey: 'ProductID' });
Products.hasMany(Offers, { foreignKey: 'ProductID' });

Category.belongsTo(Grocery, { foreignKey: 'StoreID' });
Grocery.hasMany(Category, { foreignKey: 'StoreID' });

Products.belongsTo(Grocery, { foreignKey: 'StoreID' });
Grocery.hasMany(Products, { foreignKey: 'StoreID' });






sequelize.sync()
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch((err) => {
    console.error('Error creating tables:', err);
  });


  
export default { Grocery, Offers , Category, Products};