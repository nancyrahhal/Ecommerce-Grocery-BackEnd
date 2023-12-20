import Admin from "../Modules/adminModel.js";



//create new Admin
export const admincreate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.create({ email, password });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//get all admin 
export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ error: { ...error } });
  }
};


//get admin by id 
export const getAdminById = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId, {
      attributes: { exclude: ['password'] }, 
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: { ...error } });
  }
};




export const updateAdmin = async (req, res) => {
  const adminId = req.params.id;
  const updatedData = req.body; 
  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    await admin.update(updatedData);
    const updatedAdmin = await Admin.findByPk(adminId, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: { ...error } });
  }
};


  
//delete admin
export const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await admin.destroy();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: { ...error } });
  }
};
 