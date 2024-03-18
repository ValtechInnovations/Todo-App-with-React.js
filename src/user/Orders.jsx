import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Orders() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setIsLoading(true);
    Service.getUserOrders(localStorage.getItem("UserLogin")).then((res) => {
      setOrderData(res.data);
      setIsLoading(false);
    });
  };

  return (
    <div className="col-md-9 col-md-push-3">
    {isLoading ? <Loader /> : null}
    <div>
      <h1>Placed Orders</h1>
      <hr />
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

    <div className="table-responsive mt0">
      <table className="table">
        <thead>
          <tr >
            <th className="text-center">Sr.No</th>
            <th className="text-center">Order ID</th>
            <th className="text-center">Total</th>
            <th className="text-center">Payment Mode</th>
            <th className="text-center">Payment Status</th>
            <th className="text-center">Order Status</th>
            <th className="text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((item, index) => (
            <tr key={index} className="text-center">
               <td className="price-col">{index+1}</td>
              <td className="price-col">{item.OrderId}</td>
              <td className="price-col">₹ {item.NetTotal}</td>
              <td className="price-col">{item.PaymentMode}</td>
              <td className="price-col">{item.PaymentStatus}</td>
              <td className="price-col">{item.OrderStatus}</td>
              <td className="price-col">{ (new Date(item.Date)).toLocaleDateString() }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Orders;
