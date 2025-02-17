import { comparepassword, hashpassword } from './../helpers/authHelpers.js'
import usermodels from '../models/usermodels.js'
import orderModels from '../models/orderModels.js'

import JWT from 'jsonwebtoken';
export const registerController = async (req,res) =>{
  
        try{
           const {name,email,password,address,phone,answer}=req.body;
           //validations
           if(!name){
            return res.send({message:'name is required'});
           }
           if(!email){
            return res.send({message:'email is required'});
           }
           if(!password){
            return res.send({message:'password is required'});
           }
           if(!phone){
            return res.send({message:'phone number is required'});
           }
           if(!address){
            return res.send({message:'address is required'});
           }
           if(!answer){
            return res.send({message:'answer is required'});
           }
           //check user
           const existinguser =await usermodels.findOne({email});
           //existing users
           if (existinguser){
            return res.status(200).send({
                success:false,
                message:'Already Register Please Login',
            })
           }
           //register user
           const hashedpassword=await hashpassword(password)
           //save
           const user = await new usermodels({name,email,phone,address,password:hashedpassword,answer}).save();
           res.status(201).send({
            success:true,
            message:'user register successfully',
            user,
           });

        }
        catch(error){
               console.log(error)
                res.status(500).send({
                    success:false,
                    message:'Error in Registeration',
                    error
                })
        }
    };

 //post login
 export const loginController =async(req,res)=>{
    try{
        const {email,password} = req.body
        //validations
        if(!email ||!password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user =await usermodels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not registerd'
            })
        }
        const match = await comparepassword(password ,user.password);
        if(!match){
            return res.status(202).send({
                success:false,
                message:'Invalid password',
            });
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'500d',});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,

            },
            token,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        })
    }
 };
//forgot password controller
export const ForgotPasswordController = async (req,res)=>{
    try {
        const {email,answer,newPassword}=req.body
        if(!email){
            res.status(400).send({message:'email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'new Password is required'})
        }

        //check
        const user = await usermodels.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
              success:false,
              message:'wrong email or answer'
            })
        }
        const hashed=await hashpassword(newPassword);
        await usermodels.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:'password reset successfully',
        });
    } catch (error) {
         console.log(error)
         res.status(500).send({
            success:false,
            message:'something went wrong',
            error
         })
    }
};
 //test controller
 export const testController = (req,res) =>{
    try {
        res.send("protected route");
    }
     catch (error)
     {
        console.log(error);
        res.send({error});
    }
};

//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await usermodels.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashpassword(password) : undefined;
      const updatedUser = await usermodels.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
 
//orders
 //orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModels
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//All-orders in admin page
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModels
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


//order status
export const orderStatusController = async (req, res) => {
  try {
   const { orderId } = req.params;
   const { status } = req.body;
    const orders = await orderModels.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
     message: "Error While Updateing Order",
      error,
    });
  }
};
