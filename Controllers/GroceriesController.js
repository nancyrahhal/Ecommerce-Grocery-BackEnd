import { Product, Grocery, Category, Admin } from "../Models/relations.js";

//create a new Grocery
export const groceriesCreate = async (req, res) => {
  const { adminId } = req.body;
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const grocery = await Grocery.create(req.body);
    res.status(200).json(grocery);
  } catch (error) {
    res.status(400).json({ error: error.errors[0]?.message });
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
  const updatedData = req.body;
  const { adminId } = req.body;

  try {
    const grocery = await Grocery.findByPk(GroceryId);
    if (!grocery) {
      return res.status(404).json({ error: "Grocery not found" });
    }
    if (adminId) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
    }

    await grocery.update(updatedData);
    const updatedGrocery = await Grocery.findByPk(GroceryId);

    res.status(200).json(updatedGrocery);
  } catch (error) {
    res.status(500).json({ error });
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
    await deleteGrocery.destroy();
    res
      .status(200)
      .json({ message: "Grocery deleted successfully", data: deleteGrocery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
