import {
  Product,
  Category,
  Grocery,
  GroceryProduct,
} from "../Models/relations.js";

export const productCreate = async (req, res) => {
  const image = req.file?.path;
  const { groceryId, categoryId } = req.body;

  try {
    const grocery = await Grocery.findByPk(groceryId);
    if (!grocery) {
      return res.status(400).json({ error: "Grocery not found" });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }

    // Check if the Product already exists for the grocery
    const existingGroceryProduct = await GroceryProduct.findOne({
      where: {
        groceryId,
        productName: req.body.productName,
      },
    });

    if (existingGroceryProduct) {
      return res
        .status(409)
        .json({ error: "Product already exists for this grocery" });
    }

    // Create the Product
    const product = await Product.create({ ...req.body, image });

    // Create the association between grocery and Product
    await GroceryProduct.create({
      groceryId,
      productId: product.id,
      productName: product.productName,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const productGet = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "categoryName", "image"],
        },

        {
          model: Grocery,
          as: "grocery",
          attributes: ["id", "storeName", "adminId"],
          through: {
            model: GroceryProduct,
            attributes: [],
          },
          joinTableAttributes: [],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const productGetOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params?.id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "categoryName", "image"],
        },

        {
          model: Grocery,
          as: "grocery",
          attributes: ["id", "storeName", "adminId"],
          through: {
            model: GroceryProduct,
            attributes: [],
          },
          joinTableAttributes: [],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const productUpdate = async (req, res) => {
  const { id } = req.params;
  const image = req.file?.path;
  const updateData = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (image) {
      updateData.image = image;
    }

    // Update the Product in the Product table
    await product.update(updateData);

    // Update the corresponding entry in the GroceryProduct table
    const groceryProduct = await GroceryProduct.findOne({
      where: { productId: id },
    });

    if (groceryProduct) {
      await groceryProduct.update({
        groceryId: updateData.groceryId || groceryProduct.groceryId,
        productName: updateData.productName || groceryProduct.productName,
      });
    }

    const updated = await Product.findByPk(id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const productDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsOfGrocery = async (req, res) => {
  try {
    const groceryId = req.params?.id;

    const grocery = await Grocery.findByPk(groceryId);
    if (!grocery) {
      return res.status(404).json({ error: "Grocery store not found" });
    }

    const products = await grocery.getProducts({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "categoryName", "image"],
        },

        {
          model: Grocery,
          as: "grocery",
          attributes: ["id", "storeName", "adminId"],
          through: {
            model: GroceryProduct,
            attributes: [],
          },
        },
      ],
      //   attributes: ["id", "productName", "image"],
      order: [["id", "DESC"]],
      through: { attributes: [] }, // Exclude the GroceryProduct association
      joinTableAttributes: [],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsOfGroceryByCategory = async (req, res) => {
  try {
    const groceryId = req.params?.id;
    const { categoryId } = req.body;

    const grocery = await Grocery.findByPk(groceryId);
    if (!grocery) {
      return res.status(404).json({ error: "Grocery store not found" });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }

    const products = await grocery.getProducts({
      include: [
        {
          model: Category,
          as: "category",
          where: { id: category.id },
          attributes: ["id", "categoryName", "image"],
        },

        {
          model: Grocery,
          as: "grocery",
          attributes: ["id", "storeName", "adminId"],
          through: {
            model: GroceryProduct,
            attributes: [],
          },
        },
      ],
      //   attributes: ["id", "productName", "image"],
      order: [["id", "DESC"]],
      through: { attributes: [] }, // Exclude the GroceryProduct association
      joinTableAttributes: [],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
