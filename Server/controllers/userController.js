const userModel = require("../models/userModel")
//const bcrypt = require('bcryptjs') 
const JWT = require('jsonwebtoken')

//Register
const registerControler = async (req,res) =>{
    console.log("BODY:", req.body); 
    try{
        const {username,email,password} = req.body
        //validation
        if(!username || !email ||!password){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Fields',
            })
        }
        //check existing user
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(500).send({
                success:false,
                message:'User already exist',
            })
        }
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password,salt)

        //save user
        //const newUser = new userModel({username,email,password:hashedPassword })
        const newUser = new userModel({username,email,password })
        await newUser.save();

        res.status(201).send({
            success:true,
            message:"User Regiister Successfully",
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Register API',
            error,
        })
    }
};

//LOGIN
const loginControler = async (req,res) => {
    try{
        const {email,password} = req.body
        //find user
        const user = await userModel.findOne({email , password});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'Invalid Email or password',
            })
        }
        //match password
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch){
        //     return res.status(500).send({
        //         success:false,
        //         message:'Invalid Credentials',
        //     })
        //}
        const token = await JWT.sign({id:user._id},process.env.JWT_SECRET, {
            expiresIn:'1d'});
        res.status(200).send({
            success:true,
            message:'Login successfully',
            token,
            user,
        });

    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'login API',
            error,
        })
    }
};

module.exports = {registerControler, loginControler};