import { User } from "../Models/relations.js";

//create new User
export const UserCreate = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.errors[0]?.message });
  }
};

//get all User
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get User by id
export const getUserById = async (req, res) => {
  const UserId = req.params?.id;

  try {
    const user = await User.findByPk(UserId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const userId = req.params?.id;

  try {
    const deleteUser = await User.findByPk(userId);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await deleteUser.destroy();
    res
      .status(200)
      .json({ message: "User deleted successfully", data: deleteUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update user

export const userUpdate = async (req, res) => {
  const userId = req.params?.id;
  const updatedUser = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update(updatedUser);
    const userUpdated = await User.findByPk(userId);

    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
