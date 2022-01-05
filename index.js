import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./schema/user_schema.js"



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()

const port = process.env.PORT || 3000;

const db = process.env.DB_URL;
const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;




mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
   .catch((err) => {
       console.log(err);

   });
   
   app.get("/users", async (req, res) => {
       const UserModel = await UserModel.find({});
       if (UserModel){
           return res.status(200).json({
               status: true,
               message:"Users fetched successfully",
               data: UserModel,
           });
       } else{
           return res.status(400).json({
               status:false,
               message:"Users not found",
           });
       }
   });

   app.get("/users/:id", async (req, res) => {
       const { status } = req.params;

    const userModel = await UserModel.find({}).where('status').equals(status);
    if (userModel){
        return res.status(200).json({
            status: true,
            message:"User fetched successfully",
            data: userModel,
        });
    } else{
        return res.status(400).json({
            status:false,
            message:"user not found",
        });
    }
});

app.post("/user", async (req, res) => {
    const { first_name, last_name, date_of_birth, school } =req.body;

    const userModel = await UserModel.create({
        first_name,
        last_name,
        date_of_birth,
        school,
    });

if (userModel){
    return res.status(201).json({
        status:true,
        message:"Users created",
        data:userModel,
    });
} else {
    return res.status(400).json({
   status:false,
   message:"Users failed to create",
    });
}
});


app.listen(port, () => console.log('App listening on port ${port}!'));