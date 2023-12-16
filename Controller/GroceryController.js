
import  Groceries from "../Modules/relationModel.js";

export const groceriescreate = async (req, res) => {
  const { StoreName, OwnerName, PhoneNumber, Location, City, Area } = req.body;
  try {
    const groceries = await Groceries.create({
      StoreName,
      OwnerName,
      PhoneNumber,
      Location,
      City,
      Area,
      StoreImage: `${req.protocol}://${req.get("host")}/${req.file.path}`,
    });
    res.status(200).json(groceries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const groceriesget = async (req, res) => {
  try {
    const groceries = await Groceries.find();

    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: { ...error } });
  }
};

export const grocerygetone = async (req, res) => {
  const { storeName } = req.params;
  try {
    const storeData = await Groceries.aggregate([
      { $match: { StoreName: storeName } },
      {
        $lookup: {
          from: "categories",
          let: { storeId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$storeID", "$$storeId"] },
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "categoryID",
                as: "products",
              },
            },
            {
              $project: {
                _id: 1,
                categoryName: 1,
                products: 1,
              },
            },
          ],
          as: "categories",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    // Access categories array from the result
    // const categories = storeData[0]?.categories || [];

    res.status(200).json(storeData[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const groceriesupdate = async (req, res) => {
  const { id } = req.params;
  const { StoreName, OwnerName, PhoneNumber, Location, City, Area } = req.body;
  try {
    const groceries = await Groceries.findByIdAndUpdate(
      id,
      {
        StoreName,
        OwnerName,
        PhoneNumber,
        Location,
        City,
        Area,
        StoreImage: `${req.protocol}://${req.get("host")}/${req.file.path}`,
      },
      { new: true }
    );
    res.status(200).json(groceries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const groceriesdelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Groceries.findByIdAndDelete(id);
    res.status(200).json({ message: "Groceries deleted succefully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

