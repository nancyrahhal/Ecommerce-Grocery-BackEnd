import express from "express";
import cors from "cors";
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import { authenticateToken } from "./Middlewares/auth.js";
import sequelize from "./Config/database.js";
import dotenv from "dotenv";
dotenv.config();

// import routes
import adminRoute from "./Routes/AdminRoute.js";
import categoryRoute from "./Routes/CategoriesRoutes.js";
import groceryRoute from "./Routes/GroceryRoutes.js";
import offersRoute from "./Routes/OffersRoutes.js";
import productRoutes from "./Routes/ProductRoutes.js";
import userRoute from "./Routes/UserRoute.js";
import authRoute from "./Routes/AuthRoute.js";
import googleRoute from "./Routes/GoogleRoute.js";

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
app.use("/", googleRoute);

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
