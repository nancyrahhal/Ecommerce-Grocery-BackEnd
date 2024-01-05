import { Offer, Product } from "../Models/relations.js";

// Create an offer
export const offersCreate = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Offer
export const offersGet = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      include: [
        {
          model: Product,
          as: "product",
          // attributes: ["id",]
        },
      ],

      order: [["id", "DESC"]],
    });
    res.status(200).json(offers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get one offer by ID
export const offersGetOne = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await Offer.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          // attributes: ["id",]
        },
      ],
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an offer by ID
export const offersUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    await offer.update(req.body);
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an offer by ID
export const offersDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await Offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    await offer.destroy();
    res
      .status(200)
      .json({ message: "Offer deleted successfully", data: offer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
