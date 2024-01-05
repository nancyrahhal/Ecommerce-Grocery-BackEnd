import { Category, Grocery, GroceryCategory } from "../Models/relations.js";

export const categoryCreate = async (req, res) => {
  const image = req.file?.path;
  const { groceryId, categoryName } = req.body;

  try {
    const grocery = await Grocery.findByPk(groceryId);
    if (!grocery) {
      return res.status(400).json({ error: "Grocery not found" });
    }

    // Check if the category already exists for the grocery
    const existingGroceryCategory = await GroceryCategory.findOne({
      where: {
        groceryId,
        categoryName,
      },
    });

    if (existingGroceryCategory) {
      return res
        .status(409)
        .json({ error: "Category already exists for this grocery" });
    }

    // Create the category
    const category = await Category.create({ categoryName, image });

    // Create the association between grocery and category
    await GroceryCategory.create({
      groceryId,
      categoryId: category.id,
      categoryName,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const categoryGet = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Grocery,
          as: "grocery",
          attributes: ["id", "storeName", "adminId"],

          through: {
            model: GroceryCategory,
            attributes: ["groceryId", "categoryId", "categoryName"],
          },
        },
      ],
      attributes: ["id", "categoryName", "image"],
      order: [["id", "DESC"]],
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const categoryGetOne = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params?.id, {
      include: [
        {
          model: Grocery,
          as: "grocery",
          attributes: ["id", "storeName", "adminId"],

          through: {
            model: GroceryCategory,
            attributes: ["groceryId", "categoryId", "categoryName"],
          },
        },
      ],
      attributes: ["id", "categoryName", "image"],
      order: [["id", "DESC"]],
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const categoryUpdate = async (req, res) => {
  const { id } = req.params;
  const image = req.file?.path;
  const updateData = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (image) {
      updateData.image = image;
    }

    // Update the category in the Category table
    await category.update(updateData);

    // Update the corresponding entry in the GroceryCategory table
    const groceryCategory = await GroceryCategory.findOne({
      where: { categoryId: id },
    });

    if (groceryCategory) {
      await groceryCategory.update({
        groceryId: updateData.groceryId || groceryCategory.groceryId,
        categoryName: updateData.categoryName || groceryCategory.categoryName,
      });
    }

    const updated = await Category.findByPk(id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const categoryDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    res
      .status(200)
      .json({ message: "Category deleted successfully", data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoriesOfGrocery = async (req, res) => {
  try {
    const groceryId = req.params?.id;

    const grocery = await Grocery.findByPk(groceryId);
    if (!grocery) {
      return res.status(404).json({ error: "Grocery store not found" });
    }

    const categories = await grocery.getCategories({
      attributes: ["id", "categoryName", "image"],
      order: [["id", "DESC"]],
      //exclude the association
      joinTableAttributes: [],
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
