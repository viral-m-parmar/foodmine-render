import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";

const router = Router();

router.get("/seed", expressAsyncHandler(

    async (req,res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed is already Done");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed is Done");
    }
))

router.post("/signup", expressAsyncHandler(

    async (req,res) => {
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400).send("User is already exist, please login")
            return;
        }

        const encryptPassword = await bcrypt.hash(password, 10);

        const newUser:User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptPassword,
            address,
            isAdmin:false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
        
    }
))

router.post("/login", expressAsyncHandler(
    async (req,res) => {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email,password});
        if(user){
            res.send(generateTokenResponse(user));
        }
        else{
            res.status(400).send("Username and Password is Not Valid")
        }
    }
))

const generateTokenResponse = (user:User) => {
    const token = jwt.sign({
        id:user.id, email:user.email, isAdmin:user.isAdmin
    },"SomeRandomText",{
        expiresIn:"30d"
    })
    
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
    
}

module.exports = router;