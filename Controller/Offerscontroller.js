
import  Offers from '../Modules/relationModel.js'



// Create an offer
export const offersCreate = async (req, res) => {
    const { productID, description } = req.body;
    try {
        const offer = await Offers.create({ productID, description });
        res.status(201).json(offer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all offers
export const offersGet = async (req, res) => {
    try {
        const offers = await Offers.findAll();
        res.status(200).json(offers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get one offer by ID
export const offersGetOne = async (req, res) => {
    const { id } = req.params;
    try {
        const offer = await Offers.findByPk(id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an offer by ID
export const offersUpdate = async (req, res) => {
    const { id } = req.params;
    const { productID, description } = req.body;
    try {
        const offer = await Offers.findByPk(id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        await offer.update({ productID, description });
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an offer by ID
export const offersDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const offer = await Offers.findByPk(id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        await offer.destroy();
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
