import express from "express";
import cors from "cors";
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import { authenticateToken } from "./middlewares/auth.js";
import sequelize from "./Config/database.js";
import dotenv from "dotenv";
dotenv.config();

// import routes
import adminRoute from "./Routes/adminRoute.js";
import categoryRoute from "./Routes/categoriesRoutes.js";
import groceryRoute from "./Routes/groceryRoutes.js";
import offersRoute from "./Routes/offersRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import userRoute from "./Routes/userRoute.js";
import authRoute from "./Routes/authRoute.js";

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
// app.use(express.static("./"));

// app.use(cookieParser());
//for x-www-form-urlencoded  bodyParser || express
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/auth", authRoute);

// import routes
app.use("/api", adminRoute);
app.use("/api", userRoute);
app.use("/api", groceryRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoutes);
app.use("/api", authenticateToken, offersRoute);

//Sync force/alter
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.log(error);
  }
};
syncDatabase();

try {
  app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
  });
} catch (error) {
  console.log(error);
  process.exit();
}
