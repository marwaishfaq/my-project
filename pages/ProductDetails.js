import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, json } from "react-router-dom";
import StarRating from "../components/StarRating";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../Context/Cart.js";
import toast from "react-hot-toast";
const ProductDetails = () => {
const params = useParams();
const navigate = useNavigate();
const [product, setProduct] = useState({});
const [relatedProducts, setRelatedProducts] = useState([]);
const [rating, setRating] = useState('');
const [reviewText, setReviewText] = useState('');
const [cart,setCart]=useCart();
const [products, setProducts] = useState([]);
 

//initalp details
useEffect(() => {
if (params?.slug) getProduct();
}, [params?.slug]);
//getProduct
const getProduct = async () => {
try {
const { data } = await axios.get(
`/api/v1/Product/get-Product/${params.slug}`
);
setProduct(data?.Product);
setProducts([data?.Product]);
getSimilarProduct(data?.Product._id, data?.Product.category._id);
} catch (error) {
console.log(error);
}
};
//get similar product
const getSimilarProduct = async (pid, cid) => {
try {
const { data } = await axios.get(
`/api/v1/Product/related-Product/${pid}/${cid}`
);
setRelatedProducts(data?.products);
} catch (error) {
console.log(error);
}
};
//form submission function for rating


const submitReview = async (productId, rating, review) => {
try {
const response = await axios.post(`/api/v1/Product/submit-review/${productId}`, {
rating,
review,
});

console.log(response.data);
} catch (error) {
console.error('Error submitting review:', error);
}
};

const handleSubmit = async (e) => {
e.preventDefault();
await submitReview(product._id, rating, reviewText);
setRating(null);
setReviewText('');
};
//useEffect(() => {
// const fetchProduct = async (slug) => {
// try {

// const response = await axios.get(`/api/v1/Product/${params.slug}`);
// setProduct(response.data);
// console.log('Updated product:', response.data); // Log here
// } catch (error) {
// console.error('Error fetching product:', error);
// }
//};
// fetchProduct();
// }, );
return (
<Layout>

<div className="row container product-details">

<div className="col-md-6">
<img 
  src={`/api/v1/Product/Product-photo/${product._id}`} 
  className="card-img-top" 
  alt={product.name} 
  height="300" 
  width={"350px"} 
  onLoad={(e) => e.target.style.height = '300px'}
/>
</div>
<div className="col-md-6 product-details-info ">
<h1 className="text-center">Product Details</h1>


<h6>Name : {product.name}</h6>
<h6>Description : {product.description}</h6>
<h6>Price : {product.price}$</h6>
<h6>Category : {product?.category?.name}</h6>




{products?.map((p) => (
<button
className="btn btn-dark ms-1"
onClick={() => {
setCart([...cart, p]);
localStorage.setItem(
"cart",
JSON.stringify([...cart, p])
);
toast.success("Item Added to cart");
}}
>
ADD TO CART
</button>
))}
</div>

</div>
<hr />
<div className="row container similar-products">
<h6>Similar Products</h6>
{relatedProducts.length < 1 && (
<p className="text-center">No Similar Products found</p>
)}
<div className="d-flex flex-wrap">
{relatedProducts?.map((p) => (
<div className="card m-2" style={{ width: "18rem" }}>
<img
src={`/api/v1/Product/Product-photo/${p?._id}`}
className="card-img-top"
alt={p.name}
/>
<div className="card-body">
<div className="card-name-price">
<h5 className="card-title">{p.name.substring(0, 20)}</h5>
<p className="card-text">{p.description.substring(0, 20)}...</p>
<p className="card-text"> $ {p.price}</p>
<button
className="btn btn-info ms-1 "
onClick={() => navigate(`/Product/${p.slug}`)}
>
More Details
</button>
<button
className="btn btn-dark ms-1"
onClick={() => {
setCart([...cart, p]);
localStorage.setItem(
"cart",
JSON.stringify([...cart, p])
);
toast.success("Item Added to cart");
}}
>
ADD TO CART
</button>
</div>
</div>
</div>
))}
</div>
</div>
<div className="review-form">
  <StarRating rating={rating} onRate={(newRating) => setRating(newRating)} />
  <form onSubmit={handleSubmit}>
    <textarea
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review..."
    />
    <br />
    <button type="submit" className="btn btn-primary">Submit Review</button>
  </form>
</div>

 
{product.reviews && product.reviews.length > 0 && (
  <div className="reviews-section">
    <h6>Reviews:</h6>
    {product.reviews.map((review) => (
      <div key={review._id} className="review">
        <small>
          <span className="rating-stars">
            {[...Array(review.rating)].map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
            {[...Array(5 - review.rating)].map((_, index) => (
              <span key={index}>&#9734;</span>
            ))}
          </span>
          By {review.userdId ? review.userdId.name || review.userdId.email : 'Anonymous'}
          <br />
          <p>{review.text}</p>
          <span className="date">On {new Date(product.updatedAt).toLocaleString()}</span>
        </small>
      </div>
    ))}
  </div>
)}

{product.reviews && product.reviews.length > 0 && (
  <div className="average-rating">
    <h6>Average Rating:</h6>
    <p>
      {product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length}
      stars
    </p>
  </div>
)}

</Layout>
);
};

export default ProductDetails; 