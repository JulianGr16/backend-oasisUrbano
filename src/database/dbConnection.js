import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB);

const conexion = mongoose.connection;

conexion.once('open',()=>{
    console.info('BD conectada')
})