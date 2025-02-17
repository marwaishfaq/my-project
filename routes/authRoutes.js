import express from 'express'
import {registerController,loginController,testController, ForgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requiresSignIn } from '../middlewares/authMiddleware.js';
//router object

const router =express.Router()

//routing
//register
router.post('/register',registerController);

//LOGIN||POST
router.post('/login', loginController)
//forgot password ||POST
router.post('/ForgotPassword' , ForgotPasswordController)
//test routes
router.get('/test' ,requiresSignIn,isAdmin, testController)

//protected routes for user
router.get('/user-auth' ,requiresSignIn , (req,res)=>{
    res.status(200).send({ok:true});
});
//protected routes  for admin
router.get('/Admin-auth' ,requiresSignIn ,isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
});

//update profile
router.put("/profile", requiresSignIn, updateProfileController);

//orders
router.get('/orders' ,requiresSignIn,  getOrdersController)

// All orders in admin
router.get('/All-orders' ,requiresSignIn,isAdmin,  getAllOrdersController)

// order status update
router.put("/order-status/:orderId",requiresSignIn,isAdmin,orderStatusController );

//review
//router.post('.review' requiresSignIn,reviewcontroller)

export default router;