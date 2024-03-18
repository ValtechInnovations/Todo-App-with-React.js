import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ManageInformations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [productData, setProductData] = useState([]);
  const [infoData, setInfoData] = useState([]);

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

  const loadInfo = () => {
    setIsLoading(true);
    Service.getInfoByProduct(localStorage.getItem("prodId")).then((res) => {
      setInfoData(res.data);
      setIsLoading(false);
    });
  };

  const getValue = (e) => {
    localStorage.setItem("prodId", e.target.value);
    loadInfo();
  };

  const addNewInfo = () => {
    localStorage.setItem("PageName", "Add New Specification");
    history.push("/admin/informations");
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteInfo(item.InfoId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadInfo();
      }
      setIsLoading(false);
    });
  };

  const editRecord = (item) => {
    localStorage.setItem("PageName", "Edit Specification");
    localStorage.setItem("InfoDataForEdit", JSON.stringify(item));
    history.push("/admin/informations");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>Manage Specifications</h1>
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
              onClick={() => addNewInfo()}
              className="btn btn-primary min-width"
              style={{ marginRight: "1rem" }}
            >
              Add New Specification
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

      {infoData.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Heading</th>
                <th>Description</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {infoData.map((item, index) => (
                <tr key={index}>
                  <td className="price-col">{item.Heading}</td>
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
                          "Do you want to delete this specification..?"
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

export default ManageInformations;
