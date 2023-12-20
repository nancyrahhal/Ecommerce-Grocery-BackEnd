
import  Groceries from "../Modules/groceryModel.js";



//create a new Grocery
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
    });
    res.status(200).json(groceries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// get all grocery 
export const getAllGrocery = async (req, res) => {
  try {
    const groceries = await Groceries.findAll();

    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: { ...error } });
  }
};


//get grocery by ID 
export const getGroceryById = async (req, res) => {
  const groceryId=req.params.id;
  try {
    const Grocery = await Groceries.findByPk(groceryId, {
      attributes: { exclude: ['password'] }, 
    });

    res.status(200).json(Grocery);
  } catch (error) {
    res.status(500).json({ error: { ...error } });
  }
};

 //update grocery

 export const groceryUpdate = async (req, res) => {
   
      
        const GroceryId = req.params.id;
        const updatedData = req.body; 
        try {
          const groceriesupdate = await Groceries.findByPk(GroceryId);
      
      
          await groceriesupdate.update(updatedData);
          const updatedGrocery = await Groceries.findByPk(GroceryId);
      
          res.status(200).json(updatedGrocery);
        } catch (error) {
          res.status(500).json({ error: { ...error } });
        }
      };
 


      //delete grocery
      export const deleteGrocery = async (req, res) => {
        const groceryId=req.params.id;

        try {
          const deletegrocerie = await Groceries.findByPk(groceryId);

        

          await deletegrocerie.destroy();
          res.status(204).send(); 
        } catch (error) {
          res.status(500).json({ error: { ...error } });
        }
      };
