import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import bodyParser from 'body-parser';
import sequelize from './database-configuration/database.js';
import adminRoute from "./routes/adminRoute.js"
import categoryRoute from "./routes/categoriesRoutes.js";
import groceryRoute from "./routes/groceryRoutes.js";
import offersRoute from "./routes/offersRoutes.js";
import productRoutes from "./routes/productRoutes.js"





const app= express();

app.use('/uploads', express.static('uploads'));


app.use(
    cors({
      origin: "*", // Replace with your frontend's URL
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );


  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.use(bodyParser.json());


// import routes
app.use("/api/admin",adminRoute)
app.use("/api/category",categoryRoute)
app.use("/api/grocery",groceryRoute)
app.use("/offers",offersRoute)
app.use("/products",productRoutes)



sequelize.sync()   



  try {
  app.listen(process.env.PORT, () => {
    console.log("app is running and listening on port 5000");
  });
}
catch(error){
    console.log(error)
        process.exit();
}