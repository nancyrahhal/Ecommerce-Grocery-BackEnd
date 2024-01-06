import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Admin } from "../Models/relations.js";

import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv"
dotenv.config();

export const googleLogin = async (req, res) => {
  console.log("first login")
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

const redirectUrl = 'http://127.0.0.1:4000/oauth'
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirectUrl
);

const authorizeUrl = oAuth2Client.generateAuthUrl({
  access_type:'offline',
  scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
  prompt: 'consent'
});
res.status(200).json({url:authorizeUrl});
}
export const getUserData = async (access_token) => {

  
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  //console.log('response',response);
  const data = await response.json();
  console.log("data", data);
}

export const getUserDataOAUTH = async (req, res) =>{
  console.log(" oauth first")
  const code = req.query.code;

  console.log(code);
  try {
    const redirectURL = "http://127.0.0.1:4000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    await getUserData(oAuth2Client.credentials.access_token);

  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
  }

  res.redirect(303, "http://localhost:5173/");

};

// register User
export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.errors[0]?.message });
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
        return res.status(404).json("Incorrect password");
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
        return res.status(404).json("Incorrect password");
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
