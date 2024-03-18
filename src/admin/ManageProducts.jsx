import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ManageProducts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    Service.getAllProducts().then((res) => {
      setProductData(res.data);
      setIsLoading(false);
    });
  };

  const addNewProduct = () => {
    localStorage.setItem("PageName", "Add New Product");
    history.push("/admin/product");
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteProduct(item.ProdId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadData();
      }
      setIsLoading(false);
    });
  };

  const editRecord = (item) => {
    localStorage.setItem("PageName", "Edit Product");
    localStorage.setItem("ProductDataForEdit", JSON.stringify(item));
    history.push("/admin/product");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>Manage Products</h1>
        <hr />
        <div className="text-right mb10">
          <a
            onClick={() => addNewProduct()}
            className="btn btn-primary min-width"
            style={{ marginRight: "1rem" }}
          >
            Add New Product
          </a>
        </div>
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
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Trending</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productData.map((item, index) => (
              <tr key={index}>
                <td className="price-col">{item.PName}</td>
                <td className="price-col">{item.OriginalPrice}</td>
                <td className="price-col">{item.DiscountedPrice}</td>
                <td className="price-col">{item.Trending}</td>
                <td className="delete-col">
                  <i
                    className="fa fa-pencil fa-lg"
                    style={{ marginRight: "2rem" }}
                    aria-hidden="true"
                    onClick={() => editRecord(item)}
                  ></i>
                  <i
                    className="fa fa-trash fa-lg"
                    aria-hidden="true"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you want to delete this product..?"
                      );
                      if (confirmBox === true) {
                        deleteRecord(item);
                      }
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProducts;
