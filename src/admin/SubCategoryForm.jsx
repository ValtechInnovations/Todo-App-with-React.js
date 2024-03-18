import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function SubCategoryForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, setValue, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubCatData();
  }, []);

  const loadCategories = () => {
    setIsLoading(true);
    Service.getAllCategories().then((res) => {
      setCatData(res.data);
      setIsLoading(false);
    });
  };

  const loadSubCatData = () => {
    if (localStorage.getItem("PageName") == "Edit Sub Category") {
      let subCatData = JSON.parse(localStorage.getItem("SubCatDataForEdit"));
      reset({
        CatId: subCatData.CatId,
        SCatName: subCatData.SCatName,
      });
    }
  };

  const onSubmit = (data) => {
    // data.CatId = 11;
    if (localStorage.getItem("PageName") == "Add New Sub Category") {
      addNewRecord(data);
    } else if (localStorage.getItem("PageName") == "Edit Sub Category") {
      updateRecord(data);
    }
  };

  const addNewRecord = (data) => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("CatId", data.CatId);
    fd.append("SCatImage", data.SCatImage[0]);
    fd.append("SCatName", data.SCatName);
    Service.addNewSubCategory(fd).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
      }
      setIsLoading(false);
    });
  };

  const updateRecord = (data) => {
    setIsLoading(true);
    var subCategoryData = JSON.parse(localStorage.getItem("SubCatDataForEdit"));
    data.SCatId = subCategoryData.SCatId;
    let fd = new FormData();
    fd.append("SCatId", subCategoryData.SCatId);
    fd.append("CatId", data.CatId);
    fd.append("SCatName", data.SCatName);
    fd.append("SCatImage", data.SCatImage[0]);
    Service.updateSubCategory(fd).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>{localStorage.getItem("PageName")}</h1>
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

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="signup-form"
      >
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Select Category*</label>
              <select
                type="text"
                className="form-control"
                ref={register({
                  required: "Select category name.",
                })}
                name="CatId"
              >
                <option value="">Select Category</option>
                {catData.map((item, index) => (
                  <option key={index} value={item.CatId}>
                    {item.CatName}
                  </option>
                ))}
              </select>
              {errors.CatId && (
                <span className="text-danger">{errors.CatId.message}</span>
              )}
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Sub Category Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter sub category name.",
                })}
                name="SCatName"
              />
              {errors.SCatName && (
                <span className="text-danger">{errors.SCatName.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Sub-Category Image*</label>
              <input
                type="file"
                className="form-control"
                ref={register}
                name="SCatImage"
                accept="image/*"
              />
              {errors.SCatImage && (
                <span className="text-danger">{errors.SCatImage.message}</span>
              )}
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="clearfix form-action">
          <input
            type="submit"
            className="btn btn-primary min-width"
            value="Submit"
          />
        </div>
        {/* End .form-action */}
      </form>
    </div>
  );
}

export default SubCategoryForm;
