import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from 'braintree-web-drop-in-react'
import "../styles/CartStyles.css";
import { Modal } from "react-bootstrap";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [loading, setLoading] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success('item deleted from cart')
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/Product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handleSavePaymentSlip = () => {
    if (paymentSlip) {
      const blob = new Blob([JSON.stringify(paymentSlip)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payment-slip.json';
      a.click();
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/Product/braintree/payments", {
        nonce,
        cart,
      });
      setLoading(false);
      if (data.transactionId) {
        setPaymentSlip({
          transactionId: data.transactionId,
          amount: data.amount,
          status: data.status,
        });
        setShowModal(true);
        localStorage.removeItem("cart");
        setCart([]);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 p-0 m-0">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                {p.imageUrl ? (
                  <div className="col-md-4">
                    <img
                      src={p.imageUrl}
                      alt="Uploaded Design"
                      width="100px"
                      height="100px"
                      onError={(e) => console.error("Image error:", e)}
                    />
                    {console.log("Image URL:", p.imageUrl)}
                  </div>
                ) : (
                  p._id && (
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/Product/Product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
height={"100px"}
/>
</div>
)
)}
<div className="col-md-8">
<p>{p.name}</p>
<p>{p.description?.substring(0, 30) || 'No description available'}</p>
<p>Price : {p.price}$</p>
<div className="col-md-4 cart-remove-btn">
<button
className="btn btn-danger"
onClick={() => removeCartItem(p._id)}
>
Remove
</button>
</div>
</div>
</div>
))}
</div>
<div className="col-md-5 cart-summary">
<h2>Cart Summary</h2>
<p>Total | Checkout | Payment</p>
<hr />
<h4>Total : {totalPrice()} </h4>
{auth?.user?.address ? (
<>
<div className="mb-3">
<h4>Current Address</h4>
<h5>{auth?.user?.address}</h5>
<button
className="btn  update"
onClick={() => navigate("/Dashboard/user/Profile")}
>
Update Address
</button>
</div>
</>
) : (
auth?.token ? (
<div className="mb-3">
<button
className="btn btn-outline-warning"
onClick={() => navigate("/Dashboard/user/Profile")}
>
Add Address
</button>
</div>
) : (
<div className="mb-3">
<button
className="btn btn-outline-warning"
onClick={() =>
navigate("/login", {
state: "/cart",
})
}
>
Please Login to checkout
</button>
</div>
)
)}
<div className="mt-2">
{!clientToken || !cart?.length || !auth?.token ? (
""
) : (
<>
<DropIn
options={{
authorization: clientToken,
paypal: {
flow: "vault",
},
}}
onInstance={(instance) => setInstance(instance)}
/>
<button
className="btn btn-primary"
onClick={handlePayment}
disabled={loading || !instance || !auth?.user?.address}
>
{loading ? "Processing ...." : "Make Payment"}
</button>
</>
)}
</div>
</div>
</div>
</div>
{/* Modal for payment slip */}
<Modal show={showModal} onHide={() => setShowModal(false)}>
<Modal.Header closeButton>
<Modal.Title>Payment Slip</Modal.Title>
</Modal.Header>
<Modal.Body>
<p>Transaction ID: {paymentSlip?.transactionId}</p>
<p>Amount: {paymentSlip?.amount}</p>
<p>Status: {paymentSlip?.status}</p>
</Modal.Body>
<Modal.Footer>
<button className="btn btn-secondary"
onClick={() => {
setShowModal(false);
navigate("/Dashboard/User/Orders");
}}
>
Close
</button>
<button className="btn btn-primary" onClick={handleSavePaymentSlip}>
Save Payment Slip
</button>
</Modal.Footer>
</Modal>
</Layout>
);
};

export default CartPage;