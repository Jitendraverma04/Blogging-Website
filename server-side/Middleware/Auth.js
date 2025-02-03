
import bcrypt from 'bcrypt';
import express from 'express';
import formdata from '../Models/schema.js';
import cors from 'cors';

import bodyParser from "body-parser"

const middleware=express();

middleware.use(cors());

middleware.use(bodyParser.json());



import jwt from "jsonwebtoken";
const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY||"jitendraverma";


middleware.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
        const loginCheck=await formdata.findOne({email:email})
        if(loginCheck){
            const passwordMatch = await bcrypt.compare(password, loginCheck.password);
        if(passwordMatch){

           
        const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "1d" });  
            res.statusCode=200;
            res.json({loginCheck,token})

        }
        else{
            res.statusCode=401;
            res.json("Wrong Password")
        }
    }
        else{
            res.statusCode=404;
            res.json("Invalid email-id")
        }

    }
    catch(e){
        res.statusCode=500;
        console.log(e)
        res.json("Server Error")
    }

});




middleware.post("/register",async(req,res)=>{
    const{email,password,name}=req.body

try{
    const check=await formdata.findOne({email:email})
    
    if(check){
        res.statusCode=401;
        res.json("user already exist")
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
            const dataObj = {
                 name:name,
                 email:email,
                 password:hashedPassword
             }
             
            await formdata.insertMany([dataObj])
    
    
     const registerCheck = await formdata.findOne({ email: email });

    if (!registerCheck) {
        res.statusCode = 404;
        res.json({ error: 'Email not found' });
        return;
    }

    const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "1d" });  
    res.statusCode=200;
    res.json({registerCheck,token});

    }}
    catch(e){
        res.statusCode=500;
        res.json("fail")
    }
});





const verifyToken = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};



export {middleware,verifyToken};