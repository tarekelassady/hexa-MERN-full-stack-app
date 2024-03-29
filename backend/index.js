import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersController from "./controllers/users.js";
import projectsController from "./controllers/projects.js";
import commentsController from "./controllers/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const app=express();
dotenv.config();

const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB");
      } catch (error) {
        throw error;
      }
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/users",usersController);
app.use("/projects",projectsController);
app.use("/comments",commentsController);
app.use("/uploads",express.static("./uploads"));


app.use((err,req,res,next)=>{
  const errStatus=err.status || 500;
  const errMessage=err.message || "Something went wrong";
  return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack
  })
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+file.originalname.replace(/\s+/g, '-').toLowerCase());
  }
})
const upload=multer({storage});
app.post('/upload',upload.single('file'), (req,res)=>{
  const file=req.file;
  res.status(200).json(file.filename);
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname+"/public")));

const port=process.env.PORT || 8800
app.listen(port, ()=>{
    connectdb();
    console.log("Connected to backend!")});
