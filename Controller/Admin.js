import Admin from "../Modules/categoryModel.js";

export const admincreate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.create({ email, password });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const adminget = async (req, res) => {
  try {
    const admin = await Admin.find({}, { password: 0 });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: { ...error } });
  }
};




export const adminupdate = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const admin = await Admin.findByIdAndUpdate(
        id,
        { email, password },
        { new: true }
      );
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  

  export const admindelete = async (req, res) => {
    const { id } = req.params;
    try {
       await Admin.findByIdAndDelete(
        id
      );
      res.status(200).json({message:"admin deleted succefully"});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
 