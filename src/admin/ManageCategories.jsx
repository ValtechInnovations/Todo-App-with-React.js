import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ManageCategories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    loadCatData();
  }, []);

  const loadCatData = () => {
    setIsLoading(true);
    Service.getAllCategories().then((res) => {
      setCatData(res.data);
      setIsLoading(false);
    });
  };

  const addNewCategory = () => {
    localStorage.setItem("PageName", "Add New Category");
    history.push("/admin/category");
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteCategory(item.CatId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadCatData();
      }
      setIsLoading(false);
    });
  };

  const editRecord = (item) => {
    localStorage.setItem("PageName", "Edit Category");
    localStorage.setItem("CatDataForEdit", JSON.stringify(item));
    history.push("/admin/category");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>Manage Categories</h1>
        <hr />
        <div className="text-right mb10">
          <a
            onClick={() => addNewCategory()}
            className="btn btn-primary min-width"
            style={{ marginRight: "1rem"}}
          >
            Add New Category
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
              <th>Category Name</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {catData.map((item, index) => (
              <tr key={index}>
                <td className="price-col">{item.CatName}</td>
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
                        "Do you want to delete this category..?"
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

export default ManageCategories;
