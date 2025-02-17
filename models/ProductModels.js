import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
         
    },
    quantity:{
        type:Number,
        required:true,

    },
    photo: {
        data: Buffer,
        contentType: String,
      },
    shipping:{
        type:Boolean,
    },
    reviews: [
        {
          userdId: { type: mongoose.Schema.Types.ObjectId, ref: 'userd' },
          rating: { type: Number, min: 1, max: 5 },
          text: { type: String, required: true },
          timestamp: Date,
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'userd' }
        }
      ],
      averageRating: {
        type: Number,
        get: function() {
          const ratings = this.reviews.map(review => review.rating);
          return ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
        }
      }

   
},{timestamps:true})
ProductSchema.index({ "reviews.User": 1 }, { unique: true });

export default mongoose.model('Product' , ProductSchema)