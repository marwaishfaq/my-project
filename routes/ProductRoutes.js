import express from 'express'
import  {requiresSignIn, isAdmin } from './../middlewares/authMiddleware.js'
import  {
      braintreePaymentsController,
      braintreeTokenController,
     CreateProductController,
     DeleteProductController,
     getProductController, 
     productCategoryController, 
     ProductCountController, 
     ProductFiltersController, 
     ProductListController, 
     productPhotoController, 
     relatedProductController, 
     searchProductController, 
     SingleProductController, 
     submitReview,
     
     UpdateProductController}
      from '../controllers/ProductController.js'
import formidable from 'express-formidable'
import authenticate from '../middlewares/authenticate.js ' 
import braintree from 'braintree'
 

const router = express()
//routes

//create product
router.post('/Create-Product' , requiresSignIn, isAdmin,formidable() , CreateProductController)

//update product
router.put('/Update-Product/:pid' , requiresSignIn, isAdmin,formidable() , UpdateProductController)

//get products
router.get('/get-Product' , getProductController)

//single product route
router.get('/get-Product/:slug' , SingleProductController);

//get photo
router.get("/Product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/Delete-Product/:pid", DeleteProductController);

//product filter
router.post('/Product-filter', ProductFiltersController)
 

//product count
router.get('/Product-count', ProductCountController)

//product per page
router.get('/Product-list/:page', ProductListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get('/related-Product/:pid/:cid' , relatedProductController)

//category wise product
router.get('/product-category/:slug' , productCategoryController)

//payment routes
//token
router.get('/braintree/token' , braintreeTokenController)

//payments
router.post('/braintree/payments' , requiresSignIn , braintreePaymentsController)

//review
router.post('/submit-review/:productId', authenticate, submitReview)

 
  
export default router;