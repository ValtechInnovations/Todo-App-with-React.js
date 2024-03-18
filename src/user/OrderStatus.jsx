import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function OrderStatus() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    var orderData = JSON.parse(localStorage.getItem("OrderDetails"));
    if (orderData) {
      setMsg(orderData.success);
      setOrderId(orderData.OrderId);
      setPaymentId(orderData.RazorpayPaymentId);
    } else {
      history.push("/home");
    }
  }, []);

  return (
    <div className="col-md-9 col-md-push-3">
      {paymentId != "No" ? (
        <div className="checkout-confirm">
          <img src="assets/images/okay.png" alt="Okay" />
          <h3>Payment Complete</h3>
          <h4>Thank you for your order</h4>
          <p>
            Order ID: <strong>{orderId}</strong>{" "}
          </p>
          <p>
            Payment ID: <strong>{paymentId}</strong>{" "}
          </p>

          <p>
            We have sent you an text message to your register mobile number.
          </p>
          <div className="clearfix form-action">
            <Link
              to="/placed-orders"
              type="submit"
              className="btn btn-accent min-width"
            >
              View Orders
            </Link>
          </div>
        </div>
      ) : (
        <div className="checkout-confirm">
          <img src="assets/images/okay.png" alt="Okay" />
          <h3>Order Placed Successfully.</h3>
          <h4>Thank you for your order</h4>
          <p>
            Order ID: <strong>{orderId}</strong>{" "}
          </p>
          <p>
            We have sent you an text message to your register mobile number.
          </p>
          <div className="clearfix form-action">
            <Link
              to="/placed-orders"
              type="submit"
              className="btn btn-accent min-width"
            >
              View Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
