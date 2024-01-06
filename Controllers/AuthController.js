import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Admin } from "../Models/relations.js";
import validator from "validator";
// register User
export const registerUser = async (req, res) => {
  const{password}=req.body
  try {
    if(!validator.isStrongPassword(password)){
      throw Error('password not strong enough')
    }
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register Admin
export const registerAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create login function

export const login = async (req, res, next) => {
  // try {
  //   const { username, password } = req.body;

  //   const user = await User.findOne({ where: { username } });
  //   const admin = await Admin.findOne({ where: { username } });

  //   if (!user && !admin) {
  //     return res.status(404).json({ error: "Invalid username" });
  //   }

  //   let isValidPassword = false;
  //   let role = "";

  //   if (admin) {
  //     isValidPassword = await bcrypt.compare(password, admin.password);
  //     role = admin.role;
  //   } else {
  //     isValidPassword = await bcrypt.compare(password, user.password);
  //     role = "user";
  //   }

  //   if (!isValidPassword) {
  //     return res.status(404).json({ error: "Incorrect password" });
  //   }

  //   const token = jwt.sign(
  //     { id: user?.id || admin?.id, username: user.username, role },
  //     process.env.JWT_SECRET,
  //     { expiresIn: process.env.JWT_EXPIRATION }
  //   );

  //   res.status(200).json({
  //     success: true,
  //     username: user.username,
  //     role,
  //     accessToken: token,
  //   });
  // } catch (err) {
  //   return res.status(500).json({ error: err.message });
  // }

  try {
    const { username, password } = req.body;
   
    if(!username||!password){
      throw Error("Fill all required Fields")
    }
    const user = await User.findOne({
      where: { username },
    });

    const admin = await Admin.findOne({
      where: { username },
    });

    if (!user && !admin) {
      return res.status(404).json("username not found");
    }

    if (admin) {
      // Verify password
      const passwordValid = await bcrypt.compare(password, admin.password);
      if (!passwordValid) {
        return res.status(404).json({error:"Incorrect password"});
      }

      // Authenticate user with jwt
      const token = jwt.sign(
        {
          id: admin.id,
          username: admin.username,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      res.status(200).json({
        success: true,
        username: admin.username,
        role: admin.role,
        accessToken: token,
      });
    } else {
      // Verify password
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(404).json({error: "Incorrect password"});
      }

      // Authenticate user with jwt
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: "user",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      res.status(200).json({
        success: true,
        username: user.username,
        role: "user",
        accessToken: token,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
