import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function ProductForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, setValue, reset, watch, getValues } =
    useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [subCatData, setSubCatData] = useState([]);

  useEffect(() => {
    loadSubCatData();
    loadProductData();
  }, []);

  const loadSubCatData = () => {
    setIsLoading(true);
    Service.getAllSubCategories().then((res) => {
      setSubCatData(res.data);
      setIsLoading(false);
    });
  };

  const loadProductData = () => {
    if (localStorage.getItem("PageName") == "Edit Product") {
      let productData = JSON.parse(localStorage.getItem("ProductDataForEdit"));
      reset({
        SCatId: productData.SCatId,
        PName: productData.PName,
        OriginalPrice: productData.OriginalPrice,
        DiscountedPrice: productData.DiscountedPrice,
        Description: productData.Description,
        Trending: productData.Trending,
        VideoLink: productData.VideoLink,
      });
    }
  };

  const onSubmit = (data) => {
    if (localStorage.getItem("PageName") == "Add New Product") {
      addNewRecord(data);
    } else if (localStorage.getItem("PageName") == "Edit Product") {
      updateRecord(data);
    }
  };

  const addNewRecord = (data) => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("SCatId", data.SCatId);
    fd.append("PName", data.PName);
    fd.append("OriginalPrice", data.OriginalPrice);
    fd.append("DiscountedPrice", data.DiscountedPrice);
    fd.append("Description", data.Description);
    fd.append("Trending", data.Trending);
    fd.append("PImage", data.PImage[0]);
    fd.append("VideoLink", data.VideoLink);
    Service.addNewProduct(fd).then((res) => {
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
    var productData = JSON.parse(localStorage.getItem("ProductDataForEdit"));
    let fd = new FormData();
    fd.append("ProdId", productData.ProdId);
    fd.append("SCatId", data.SCatId);
    fd.append("PName", data.PName);
    fd.append("OriginalPrice", data.OriginalPrice);
    fd.append("DiscountedPrice", data.DiscountedPrice);
    fd.append("Description", data.Description);
    fd.append("Trending", data.Trending);
    fd.append("PImage", data.PImage[0]);
    fd.append("VideoLink", data.VideoLink);
    Service.updateProduct(fd).then((res) => {
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
          <div className="col-sm-6">
            <div className="form-group">
              <label>Select Sub Category*</label>
              <select
                type="text"
                className="form-control"
                ref={register({
                  required: "Select sub category.",
                })}
                name="SCatId"
              >
                <option value="">Select Sub-Category</option>
                {subCatData.map((item, index) => (
                  <option key={index} value={item.SCatId}>
                    {item.SCatName}
                  </option>
                ))}
              </select>
              {errors.SCatId && (
                <span className="text-danger">{errors.SCatId.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Product Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter product name.",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters are required",
                  },
                  // pattern: {
                  //   value: /^\S*$/,
                  //   message: "Only space is not allowed.",
                  // },
                })}
                name="PName"
              />
              {errors.PName && (
                <span className="text-danger">{errors.PName.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Original Price*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter price.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter only numbers.",
                  },
                })}
                name="OriginalPrice"
              />
              {errors.OriginalPrice && (
                <span className="text-danger">
                  {errors.OriginalPrice.message}
                </span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Discounted Price*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter price.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter only numbers.",
                  },
                  validate: (value) =>
                    value < getValues("OriginalPrice") ||
                    "Discounted price must be less than to original price",
                })}
                name="DiscountedPrice"
              />
              {errors.DiscountedPrice && (
                <span className="text-danger">
                  {errors.DiscountedPrice.message}
                </span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Trending*</label>
              <select
                type="text"
                className="form-control"
                ref={register({
                  required: "Select trending.",
                })}
                name="Trending"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.DiscountedPrice && (
                <span className="text-danger">{errors.Trending.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Product Image*</label>
              <input
                type="file"
                className="form-control"
                ref={register}
                name="PImage"
                accept="image/*"
              />
              {errors.PImage && (
                <span className="text-danger">{errors.PImage.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <label>Youtube Video ID</label>
              <input
                type="text"
                className="form-control"
                ref={register({})}
                name="VideoLink"
              />
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <label>Description*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter description.",
                  // pattern: {
                  //   value: /^\S*$/,
                  //   message: "Only space is not allowed.",
                  // },
                })}
                name="Description"
              />
              {errors.DiscountedPrice && (
                <span className="text-danger">
                  {errors.Description.message}
                </span>
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

export default ProductForm;
