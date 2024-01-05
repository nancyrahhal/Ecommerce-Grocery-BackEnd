import Grocery from "./groceryModel.js";
import Offer from "./offerModel.js";
import Category from "./categoryModel.js";
import Product from "./productModel.js";
import User from "./userModel.js";
import Admin from "./adminModel.js";

import GroceryCategory from "./GroceryCategory.js";
import GroceryProduct from "./GroceryProduct.js";

Admin.hasMany(Grocery, {
  foreignKey: "adminId",
  as: "groceries",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Grocery.belongsTo(Admin, {
  foreignKey: "adminId",
  as: "admin",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Product.hasOne(Offer, {
  foreignKey: "productId",
  as: "offer",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Offer.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Grocery.belongsToMany(Category, {
  through: {
    model: GroceryCategory,
  },
  foreignKey: "groceryId",
  otherKey: "categoryId",
  as: "categories",
});

Category.belongsToMany(Grocery, {
  through: {
    model: GroceryCategory,
  },
  foreignKey: "categoryId",
  otherKey: "groceryId",
  as: "grocery",
});

Grocery.belongsToMany(Product, {
  through: {
    model: GroceryProduct,
  },
  foreignKey: "groceryId",
  otherKey: "productId",
  as: "products",
});

Product.belongsToMany(Grocery, {
  through: {
    model: GroceryProduct,
  },
  foreignKey: "productId",
  otherKey: "groceryId",
  as: "grocery",
});

//Export the models
export {
  Grocery,
  Offer,
  Category,
  Product,
  User,
  Admin,
  GroceryCategory,
  GroceryProduct,
};
