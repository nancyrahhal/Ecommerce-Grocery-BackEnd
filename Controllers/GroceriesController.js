import { Product, Grocery, Category, Admin } from "../Models/relations.js";
import fs from "fs";
import path from "path";
//create a new Grocery
export const groceriesCreate = async (req, res) => {
  const { adminId } = req.body;
  try {
    const storeImage = req.file.filename;
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const grocery = await Grocery.create({
      ...req.body,
      storeImage: storeImage,
    });
    res.status(200).json(grocery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all grocery
export const getAllGrocery = async (req, res) => {
  try {
    const groceries = await Grocery.findAll({
      include: [
        { model: Admin, as: "admin", attributes: ["id", "username", "role"] },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "categoryName", "image"],
          through: { attributes: [] }, // Exclude the GroceryProduct association
          joinTableAttributes: [],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get grocery by ID
export const getGroceryById = async (req, res) => {
  const groceryId = req.params.id;
  try {
    const grocery = await Grocery.findByPk(groceryId, {
      include: [
        { model: Admin, as: "admin", attributes: ["id", "username", "role"] },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "categoryName", "image"],
          through: { attributes: [] }, // Exclude the GroceryProduct association
          joinTableAttributes: [],
        },
      ],
    });

    res.status(200).json(grocery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update grocery
export const groceryUpdate = async (req, res) => {
  const GroceryId = req.params?.id;
  const updatedData = { ...req.body };
  const { adminId } = req.body;

  try {
    const grocery = await Grocery.findByPk(GroceryId);
    if (!grocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }
    const oldImage = grocery.storeImage;
    if (req?.file?.filename) {
      updatedData.storeImage = req?.file?.filename;
    }
    
    if (adminId) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
    }

    await grocery.update(updatedData);
    const updatedGrocery = await Grocery.findByPk(GroceryId);
    if (oldImage) {
      const oldImagePath = path.join("./uploads", oldImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      } else {
        console.log("File not found: ", oldImagePath);
      }
    }
    res.status(200).json(updatedGrocery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete grocery
export const deleteGrocery = async (req, res) => {
  const groceryId = req.params?.id;

  try {
    const deleteGrocery = await Grocery.findByPk(groceryId);

    if (!deleteGrocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }
    //delete all related categories
    const categories = await deleteGrocery.getCategories();
    await Promise.all(categories?.map((category) => category.destroy()));

    //delete all related products
    const products = await deleteGrocery.getProducts();
    console.log(products);
    await Promise.all(products?.map((product) => product.destroy()));

    //delete the Grocery
    const imageToDelete = deleteGrocery.storeImage;
    await deleteGrocery.destroy();
    if (imageToDelete) {
      const imagePath = path.join("./uploads", imageToDelete);
      fs.unlinkSync(imagePath);
    }
    res
      .status(200)
      .json({ message: "Grocery deleted successfully", data: deleteGrocery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
