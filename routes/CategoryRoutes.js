import express  from 'express'
 import {requiresSignIn , isAdmin} from './../middlewares/authMiddleware.js'
import {  
      CategoryControlller,
      CreateCategoryController, 
      DeleteCategoryController, 
      SingleCategoryController, 
      updateCategoryController } from '../controllers/CategoryController.js';


const router =express.Router()
                      //routes
//create category
router.post('/Create-Category' , requiresSignIn,isAdmin,CreateCategoryController);

//update category
router.put('/update-Category/:id' ,requiresSignIn,isAdmin,updateCategoryController);


//get all category
router.get('/getAll-Category' , CategoryControlller);

//single category rpute
router.get('/Single-Category/:slug' , SingleCategoryController);


//delete category
router.delete('/Delete-Category/:id' , requiresSignIn , isAdmin, DeleteCategoryController)

export default router;