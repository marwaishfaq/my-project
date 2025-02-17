import React, { useState, useEffect } from "react";
import Layout from '../components/Layout/Layout'
import { useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductStyles.css";
import toast from 'react-hot-toast'
import { useCart } from '../Context/Cart.js'

const CategoryProduct = () => {
    const params = useParams();
    const navigate=useNavigate();
    //const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart,setCart]=useCart()

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
      }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
          const { data } = await axios.get(
            `/api/v1/Product/product-category/${params.slug}`
          );
          setProducts(data?.products);
          setCategory(data?.category);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <Layout>
        <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/Product/Product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name.substring(0,20)}...</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}... </p>
                    <p className="card-text"> $ {p.price}</p>
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/Product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button class="btn btn-dark ms-1 card-button" onClick={()=>{
                    setCart([...cart,p]);
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                    toast.success('item added to cart')
                   }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
      
      
    </Layout>
  )
}

export default CategoryProduct
