import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ManageSubCategories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    setIsLoading(true);
    Service.getAllCategories().then((res) => {
      setCatData(res.data);
      setIsLoading(false);
    });
  };
  const loadSubCatData = (value) => {
    setIsLoading(true);
    Service.getSubcategories(value).then((res) => {
      setSubCatData(res.data);
      setIsLoading(false);
    });
  };

  const getValue = (e) => {
    // localStorage.setItem("prodId", e.target.value);
    loadSubCatData(e.target.value);
  };

  const addNewSubCategory = () => {
    localStorage.setItem("PageName", "Add New Sub Category");
    history.push("/admin/sub-category");
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteSubCategory(item.SCatId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadSubCatData();
      }
      setIsLoading(false);
    });
  };

  const editRecord = (item) => {
    localStorage.setItem("PageName", "Edit Sub Category");
    localStorage.setItem("SubCatDataForEdit", JSON.stringify(item));
    history.push("/admin/sub-category");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>Manage Sub Categories</h1>
        <hr />
        <div className="row">
          <div className="col-sm-8">
            <div className="form-group">
              <label>Select Category*</label>
              <select
                type="text"
                className="form-control"
                name="ProdId"
                onChange={getValue}
              >
                <option value="0">Select Category</option>
                {catData.map((item, index) => (
                  <option key={index} value={item.CatId}>
                    {item.CatName}
                  </option>
                ))}
              </select>
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-4 text-right mt35">
            <a
              onClick={() => addNewSubCategory()}
              className="btn btn-primary min-width"
              style={{ marginRight: "1rem" }}
            >
              Add New Sub Category
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

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Sub Category Name</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subCatData.map((item, index) => (
              <tr key={index}>
                <td className="price-col">{item.SCatName}</td>
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
                        "Do you want to delete this sub category..?"
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

export default ManageSubCategories;
