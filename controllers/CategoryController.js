import slugify from "slugify";
import CategoryModels from "../models/CategoryModels.js";
 

export const CreateCategoryController= async(req,res)=>{
    try {
        const {name} =req.body;
        if(!name){
            return res.status(401).send({message:'name is required'});
        }
        const existingCategory=await CategoryModels.findOne({name});
        if(existingCategory){
            return res.status(201).send({
                success:true,
                message:'Category is already exists',
            });
        }

        const Category=await new CategoryModels({
            name,
            slug:slugify(name),
        }).save();
        res.status(201).send({
            success:true,
            message:'new category created',
            Category,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in category"
        })
    }
};

//update category

export const updateCategoryController=async(req,res)=>{
    try {
        const {name} = req.body
        const {id} =req.params;
        const Category=await CategoryModels.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category updating successfully',
            Category,
            
        });
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:'error in updating category',
            
        })
    }
};

//get all category
export const CategoryControlller = async (req, res) => {
   try {
        const Category = await CategoryModels.find({});
       res.status(200).send({
         success: true,
          message: "All Categories List",
          Category,
       });
        
    } catch (error) {
       console.log(error)
        res.status(500).send({
           success: false,
           error,
           message: "Error while getting all categories",
         });
   }
}

//get singal category

export const SingleCategoryController=async(req,res)=>{
    try {
        const Category=await CategoryModels.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"get single category successfully",
            Category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting single category"
        })
    }
};
  
//delete category

export const DeleteCategoryController =async(req,res)=>{
    try {
        const {id} = req.params
        await CategoryModels.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'category deleted successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while deleting category"
        })
    }
};
  
