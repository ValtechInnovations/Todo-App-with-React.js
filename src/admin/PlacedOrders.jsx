import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function PlacedOrders() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setIsLoading(true);
    Service.getAllOrders().then((res) => {
      setOrdersData(res.data);
      setIsLoading(false);
    });
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteOrder(item.OrderId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadOrders();
      }
      setIsLoading(false);
    });
  };

  const updateStatus = (status, orderId) => {
    setIsLoading(true);
    Service.updateOrderStatus(status, orderId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadOrders();
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
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

      <div className="table-responsive action-btn-show-option">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Action</th>
              {/* <th className="text-center">Sr.No</th> */}
              <th className="text-center">OrderID</th>
              <th className="text-center">Total</th>
              <th className="text-center">Customer</th>
              <th className="text-center">Contact</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Status</th>
              <th className="text-center">Orders</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {ordersData.map((item, index) => (
              <tr key={index}>
                {/* <td className="price-col">{index + 1}</td> */}
                <td className="delete-col">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      Action <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          onClick={() =>
                            updateStatus("Order Packed", item.OrderId)
                          }
                        >
                          Order Packed
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            updateStatus("Order Shipped", item.OrderId)
                          }
                        >
                          Order Shipped
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            updateStatus("Order Delivered", item.OrderId)
                          }
                        >
                          Order Delivered
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            updateStatus("Cancelled", item.OrderId)
                          }
                        >
                          Cancel Order
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Do you want to delete this order..?"
                            );
                            if (confirmBox === true) {
                              deleteRecord(item);
                            }
                          }}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="price-col">{item.OrderId}</td>
                <td className="price-col">₹ {item.NetTotal}</td>
                <td className="price-col">
                  {item.FName} {item.LName}
                </td>
                <td className="price-col">{item.Contact}</td>

                <td className="price-col">{item.PaymentMode}</td>
                <td className="price-col">{item.PaymentStatus}</td>
                <td className="price-col">{item.OrderStatus}</td>
                <td className="price-col">
                  {new Date(item.Date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlacedOrders;
