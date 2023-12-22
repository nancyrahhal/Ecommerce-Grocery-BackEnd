
import  Category from "../Modules/relationModel.js";

export const categoryCreate = async (req, res) => {
    const { categoryName, storeID } = req.body;
    
    if (!storeID) {
        return res.status(400).json({ error: "Invalid storeID" });
    }

    try {
        const category = await Category.create({ categoryName, storeID });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const categoryGet = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Grocery,
                as: 'storeData',
                attributes: ['StoreName']
            }],
            attributes: ['categoryName'],
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const categoryGetOne = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const categoryUpdate = async (req, res) => {
    const { id } = req.params;
    const { categoryName, storeID } = req.body;

    if (!storeID) {
        return res.status(400).json({ error: "Invalid storeID" });
    }

    try {
        const category = await Category.findByPk(id);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update({ categoryName, storeID });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const categoryDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
