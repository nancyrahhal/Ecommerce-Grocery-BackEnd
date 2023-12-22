
import  Product  from "../Modules/relationModel.js"
import  Grocery  from "../Modules/relationModel.js"
import  Category  from "../Modules/relationModel.js"



export const productCreate = async (req, res) => {
    const { productName, price, image, categoryID, storeID, newprice, itsnew } = req.body;

    try {
        const product = await Product.create({
            productName,
            price,
            image: `${req.protocol}://${req.get("host")}/${req.file.path}`,
            categoryID,
            storeID,
            newprice,
            itsnew,
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const productGet = async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [
                {
                    model: Grocery,
                    as: 'storeData',
                    attributes: ['StoreName', 'OwnerName', 'PhoneNumber', 'Location', 'City', 'Area', 'StoreImage'],
                },
                {
                    model: Category,
                    as: 'categoryData',
                    attributes: ['categoryName'],
                },
            ],
            attributes: ['productName', 'price', 'image', 'newprice', 'itsnew'],
        });

        res.status(200).json(productData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const productGetOne = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const productUpdate = async (req, res) => {
    const { id } = req.params;
    const { productName, price, image, categoryID, storeID, newprice, itsnew } = req.body;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update({
            productName,
            price,
            image: req.file.path ? `${req.protocol}://${req.get("host")}/${req.file.path}` : product.image,
            categoryID,
            storeID,
            newprice,
            itsnew,
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const productDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
