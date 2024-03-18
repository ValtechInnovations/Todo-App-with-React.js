import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function CategoryForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, setValue, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    loadCatData();
  }, []);

  const loadCatData = () => {
    if (localStorage.getItem("PageName") == "Edit Category") {
      let catData = JSON.parse(localStorage.getItem("CatDataForEdit"));
      reset({
        CatName: catData.CatName,
      });
    }
  };

  const onSubmit = (data) => {
    if (localStorage.getItem("PageName") == "Add New Category") {
      addNewRecord(data);
    } else if (localStorage.getItem("PageName") == "Edit Category") {
      updateRecord(data);
    }
  };

  const addNewRecord = (data) => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("CatImage", data.CatImage[0]);
    fd.append("CatName", data.CatName);
    Service.addNewCategory(fd).then((res) => {
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
    var categoryData = JSON.parse(localStorage.getItem("CatDataForEdit"));
    let fd = new FormData();
    fd.append("CatImage", data.CatImage[0]);
    fd.append("CatName", data.CatName);
    fd.append("CatId", categoryData.CatId);
    Service.updateCategory(fd).then((res) => {
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
          <div className="col-sm-12">
            <div className="form-group">
              <label>Category Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter category name.",
                })}
                name="CatName"
              />
              {errors.CatName && (
                <span className="text-danger">{errors.CatName.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <label>Category Image*</label>
              <input
                type="file"
                className="form-control"
                ref={register}
                name="CatImage"
                accept="image/*"
              />
              {errors.CatImage && (
                <span className="text-danger">{errors.CatImage.message}</span>
              )}
            </div>
            {/* End .form-group */}
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

export default CategoryForm;
