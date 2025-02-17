import JWT from 'jsonwebtoken'
import usermodels from '../models/usermodels.js';
//protected routes token base

export const requiresSignIn = async(req,res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
         req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
    

}

//admin access
export const isAdmin = async (req,res,next) =>{
    try {
         const user = await usermodels.findById(req.user._id)
         if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access'
            })
         }else{
            next();
         }
    } 
    catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in Admin Middleware',
        });
    }
}