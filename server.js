import express from 'express';
import colors from 'colors'
 import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import CategoryRoutes from './routes/CategoryRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import ImageRoutes from './routes/ImageRoutes.js';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js'
 //configure env
 dotenv.config();

//database config

connectDB();
 

 



//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) ;
app.use(morgan('dev')) ;

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/Category',CategoryRoutes);
app.use('/api/v1/Product' , ProductRoutes)
app.use('/api/v1/Image',ImageRoutes)
app.use('/images', express.static('images'));
app.use("/api/form",contactRoutes)
//rest api
app.get("/", (req,res)=>{
    res.send("<h1>Welcome to e-commerece app</h1>"
    )
});
 
//port
const PORT= process.env.PORT||8080;
//run listen
app.listen(PORT,()=>{
   console.log(`server Runing on ${process.env.DEV_MODE} mode on  ${PORT}`.bgCyan.white);
});
 
//AIzaSyCMPo0ql4POzmfSf5edAzH91EZl5GYzOZ4