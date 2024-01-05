import { Admin, Grocery } from "../Models/relations.js";

//create new Admin
export const adminCreate = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all admin
export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
      include: [{ model: Grocery, as: "groceries" }],
    });

    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get admin by id
export const getAdminById = async (req, res) => {
  const adminId = req.params?.id;

  try {
    const admin = await Admin.findByPk(adminId, {
      attributes: { exclude: ["password"] },
      include: [{ model: Grocery, as: "groceries" }],
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const adminId = req.params?.id;
  const updatedData = req.body;
  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    await admin.update(updatedData);
    const updatedAdmin = await Admin.findByPk(adminId, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message }).json;
  }
};

//delete admin
export const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await admin.destroy();
    res
      .status(200)
      .json({ message: "Admin deleted successfully", data: admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
