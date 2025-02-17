import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../Context/Search.js";
import { useCart } from '../Context/Cart.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const SearchPage = () => {
  const [values, setValues] = useSearch();
  const [cart,setCart]=useCart()
  const navigate=useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
           {/*    */}      
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/Product/Product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-info ms-1 card-button" onClick={()=> navigate(`/Product/${p.slug}`)}>More Details</button>
                   <button class="btn btn-dark ms-1 card-button" onClick={()=>{
                    setCart([...cart,p]);
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                    toast.success('item added to cart')
                   }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;