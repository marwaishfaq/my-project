import slugify from 'slugify';
import ProductModels from '../models/ProductModels.js'
import CategoryModels from '../models/CategoryModels.js'
import fs from 'fs'
import orderModels from '../models/orderModels.js';
import braintree from 'braintree';
 
 
import dotenv from 'dotenv'
import multer from 'multer';
dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:  process.env.BRAINTREE_MERCHANT_ID,
  publicKey:  process.env.BRAINTREE_PUBLIC_KEY,
  privateKey:  process.env.BRAINTREE_PRIVATE_KEY,
});

export const CreateProductController =async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'name is required'})
            case !description:
                return res.status(500).send({error:'description is required'})
            case !price:
                return res.status(500).send({error:'price is required'})
             case !category:
                return res.status(500).send({error:'category is required'})
             case !quantity:
                return res.status(500).send({error:'quantity is required'})
             case photo && photo.size>1000000 :
                return res.status(500).send({error:'photo is required and should be less than 1mb'});
        }
        const Product = new ProductModels({...req.fields,slug:slugify(name)})

           if(photo){
            Product.photo.data = fs.readFileSync(photo.path)
            Product.photo.contentType=photo.type
           }
           await Product.save();
           res.status(201).send({
            success:true,
            message:"Product created successfully",
            Product,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in product creating",
            error,
        });
    }
};

//get all product
//get all product
export const getProductController=async(req,res)=>{
  try {
  const Product=await ProductModels
  .find({})
  .populate({
  path: 'category', // Note: lowercase 'category'
  model: 'Category',
  })
  .select("-photo")
  .limit(12)
  .sort({createdAt:-1});
  res.status(200).send({
  success:true,
  countTotal:Product.length,
  message:" getting products successfully",
  Product,
  });
  } catch (error) {
  res.status(500).send({
  success:false,
  message:"error in getting products",
  error: error.message
  });
  }
  }


//get singal category

//get singal category

export const SingleProductController=async(req,res)=>{
  try {
  const Product = await ProductModels.findOne({slug:req.params.slug})
  .select("-photo")
  .populate({
  path: 'category', // Note: lowercase 'category'
  model: 'Category',
  })
  .populate({
  path: 'reviews.userdId', // Note: lowercase 'reviews'
  model: 'userd',
  select: 'name email' // Select only the required fields
  });
  console.log(Product.reviews); // Add this line
  res.status(200).send({
  success:true,
  message:"get single product successfully",
  Product,
  });
  } catch (error) {
  console.log(error)
  res.status(500).send({
  success:false,
  error,
  message:"error while getting single product"
  })
  }
  };
  

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const productId = req.params.pid;
    if (!productId) {
      return res.status(400).send({ message: 'Product ID is required' });
    }
    const product = await ProductModels.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
  //delete product
export const DeleteProductController = async (req, res) => {
    try {
      await ProductModels.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };

  //upate products
export const UpdateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const Product = await ProductModels.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        Product.photo.data = fs.readFileSync(photo.path);
        Product.photo.contentType = photo.type;
      }
      await Product.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        Product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };

  //filters
export const ProductFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModels.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const ProductCountController = async (req, res) => {
  try {
    const total = await ProductModels.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const ProductListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModels
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await ProductModels
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModels
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModels.findOne({ slug: req.params.slug });
    const products = await ProductModels.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway
//token
export const braintreeTokenController=async (req,res)=>{
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//payments
export const braintreePaymentsController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          if (result.success) {
            const transaction = result.transaction;
            const order = new orderModels({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({
              transactionId: transaction.id,
              amount: `$${parseFloat(transaction.amount).toFixed(2)}`,
              status: transaction.status,
            });
          } else {
            res.status(500).send({ error: 'Payment failed' });
          }
        } else {
          res.status(500).send({ error: 'Payment failed' });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

//review
 

export const submitReview = async (req, res) => {
  try {
  console.log('req.userd:', req.userd);
  if (!req.userd) {
  return res.status(401).json({ message: 'Please login to submit a review' });
  }
  
  const { productId } = req.params;
  const { rating, review } = req.body;
  
  const reviewData = {
  rating,
  text: review,
  userdId: req.userd._id,
  };
  
  const updatedProduct = await ProductModels.findByIdAndUpdate(
  productId,
  { $push: { reviews: reviewData } },
  { new: true }
  );
  
  res.status(200).json({ message: 'Review submitted successfully', updatedProduct });
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error submitting review' });
  }
  };
//image

const upload = multer({ dest: './upload/' });

export default class  uploadController {
    async uploadFile(req, res) {
      try {
        console.log(req.file);
        res.send({ imageUrl: 'http://localhost:3000/upload/' + req.file.filename });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading file' });
      }
    }
  }
  
 
 