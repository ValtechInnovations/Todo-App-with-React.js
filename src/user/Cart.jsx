import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";
import Checkout from "./Checkout";

function Cart(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [cartData, setCartData] = useState([]);
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    setIsLoading(true);
    Service.getCartData(localStorage.getItem("UserLogin")).then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].Total = res.data[i].Qty * res.data[i].DiscountedPrice;
      }
      // get cart count
      Service.getCartCount(localStorage.getItem("UserLogin")).then((res) => {
        props.addToCartHandler(res.data[0].Count);
        setIsLoading(false);
      });
      // end cart count
      setCartData(res.data);
      calculateTotal(res.data);
      setIsLoading(false);
    });
  };

  const updateQty = (item, flag) => {
    setIsLoading(true);
    if (flag == "add") {
      item.Qty = item.Qty + 1;
    } else if (flag == "remove") {
      if (item.Qty == 1) {
        //deleteProduct(item);
      } else {
        item.Qty = item.Qty - 1;
      }
    }
    Service.updateCartProductQty(item).then((res) => {
      if (res.data.success) {
        loadCartData();
      }
      setIsLoading(false);
    });
  };

  const deleteProduct = (item) => {
    setIsLoading(true);
    Service.deleteCartProduct(item.CartId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        localStorage.setItem("CartCountStatus", Date.now());
        loadCartData();
      }
      setIsLoading(false);
    });
  };

  const calculateTotal = (item) => {
    var nTotal = 0;
    for (let i = 0; i < item.length; i++) {
      nTotal = nTotal + item[i].Total;
    }
    setNetTotal(nTotal);
  };

  const shopping = () => {
    history.push("/");
  };

  const checkout = () => {
    localStorage.setItem("TotalAmount", netTotal);
    history.push("/checkout");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading && <Loader />}

      {cartData.length <= 0 ? (
        <div>
          <div className="page-header text-center">
            <h1>Your cart is empty..!</h1>
          </div>
          <form action="#" className="signin-form">
            <div className="clearfix form-action">
              <input
                onClick={() => shopping()}
                type="submit"
                className="btn btn-accent center-block min-width"
                value="Shop Now"
              />
            </div>
            {/* End .form-action */}
          </form>
        </div>
      ) : (
        <>
          <div className="page-header text-center">
            <h1>Shopping Cart</h1>
            <p>Your cart items</p>
          </div>
          {/* End .page-header */}

          {showMsg == true ? (
            <div className={msgClass} role="alert">
              <strong>{msgText}</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : null}

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr key={index}>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-image-container">
                          <img
                            src={item.Image}
                            alt={item.PName}
                            style={{ height: "100px", width: "100px" }}
                          />
                        </figure>
                        <h3 className="product-title">
                          <a>{item.PName}</a>
                        </h3>
                      </div>
                      {/* End .product */}
                    </td>
                    <td className="price-col">₹ {item.DiscountedPrice}</td>
                    <td className="quantity-col text-left">
                      <i
                        onClick={() => updateQty(item, "remove")}
                        className="fa fa-minus"
                        style={{ paddingRight: "20px", cursor: "pointer" }}
                      ></i>
                      {item.Qty}
                      <i
                        onClick={() => updateQty(item, "add")}
                        className="fa fa-plus"
                        style={{ paddingLeft: "20px", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="total-col">₹ {item.Total}</td>
                    <td className="delete-col">
                      <a
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you want to delete this product..?"
                          );
                          if (confirmBox === true) {
                            deleteProduct(item);
                          }
                        }}
                        className="btn-delete"
                        title="Delete product"
                        role="button"
                      ></a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* End .table-responsive */}

          <div className="row">
            <div className="col-sm-5">
              {/* <div className="cart-discount">
              <h3>Coupon Discount</h3>
              <p>Enter your coupon code if you have one</p>
  
              <form action="#">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your coupon code"
                  />
                  <span className="input-group-btn">
                    <button type="submit" className="btn">
                      Apply Code
                    </button>
                  </span>
                </div>
              </form>
            </div>
         */}
            </div>

            <div className="col-sm-6 col-sm-offset-1">
              <div className="cart-proceed">
                <p className="cart-total">
                  <span>TOTAL AMOUNT :</span>
                  <span className="text-accent">₹ {netTotal}</span>
                </p>
                <a className="btn btn-accent" onClick={() => checkout()}>
                  Proceed to Checkout
                </a>
              </div>
              {/* Endd .cart-proceed */}
            </div>
            {/* End .col-sm-4 */}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
