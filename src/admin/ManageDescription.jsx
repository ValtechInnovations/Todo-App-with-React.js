import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ManageDescription() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [productData, setProductData] = useState([]);
  const [descData, setDescData] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    Service.getAllProducts().then((res) => {
      setProductData(res.data);
      setIsLoading(false);
    });
  };

  const loadDescription = () => {
    setIsLoading(true);
    Service.getDescriptionByProduct(localStorage.getItem("prodId")).then((res) => {
      setDescData(res.data);
      setIsLoading(false);
    });
  };

  const getValue=(e)=>{
    localStorage.setItem("prodId",e.target.value);
    loadDescription();
  }

  const addNewDesc = () => {
    localStorage.setItem("PageName", "Add New Description");
    history.push("/admin/descriptions");
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteDescription(item.DescId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadDescription();
      }
      setIsLoading(false);
    });
  };

  const editRecord = (item) => {
    localStorage.setItem("PageName", "Edit Description");
    localStorage.setItem("DescDataForEdit", JSON.stringify(item));
    history.push("/admin/descriptions");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>Manage Description</h1>
        <hr />
        <div className="row">
          <div className="col-sm-8">
            <div className="form-group">
              <label>Select Product*</label>
              <select
                type="text"
                className="form-control"
                name="ProdId"
                onChange={getValue}
              >
                <option value="0">Select Product</option>
                {productData.map((item, index) => (
                  <option key={index} value={item.ProdId}>
                    {item.PName}
                  </option>
                ))}
              </select>
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-4 text-right mt35">
            <a
              onClick={() => addNewDesc()}
              className="btn btn-primary min-width"
              style={{ marginRight: "1rem"}}
            >
              Add New Description
            </a>
          </div>
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

      {descData.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{width:'80%'}}>Description</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {descData.map((item, index) => (
                <tr key={index}>
                  <td className="price-col">{item.Description}</td>
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
                          "Do you want to delete this description..?"
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
      )}
    </div>
  );
}

export default ManageDescription;
