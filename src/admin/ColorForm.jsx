import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function ColorForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, setValue, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    loadProduct();
    loadColorData();
  }, []);

  const loadProduct = () => {
    setIsLoading(true);
    Service.getAllProducts().then((res) => {
      setProductData(res.data);
      setIsLoading(false);
    });
  };

  const loadColorData = () => {
    if (localStorage.getItem("PageName") == "Edit Color") {
      let colorData = JSON.parse(localStorage.getItem("ColorDataForEdit"));
      reset({
        ProdId: colorData.ProdId,
        ColorName: colorData.ColorName,
        Code: colorData.Code,
      });
    }
  };

  const onSubmit = (data) => {
    if (localStorage.getItem("PageName") == "Add New Color") {
      addNewRecord(data);
    } else if (localStorage.getItem("PageName") == "Edit Color") {
      updateRecord(data);
    }
  };

  const addNewRecord = (data) => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("ProdId", data.ProdId);
    fd.append("ColorName", data.ColorName);
    fd.append("Code", data.Code);
    fd.append("Image", data.Image[0]);
    Service.addNewColor(fd).then((res) => {
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
    var colorData = JSON.parse(localStorage.getItem("ColorDataForEdit"));
    let fd = new FormData();
    console.log(colorData.ColorId);
    fd.append("ColorId", colorData.ColorId);
    fd.append("ProdId", data.ProdId);
    fd.append("ColorName", data.ColorName);
    fd.append("Code", data.Code);
    fd.append("Image", data.Image[0]);
    Service.updateColor(fd).then((res) => {
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
              <label>Select Product*</label>
              <select
                type="text"
                className="form-control"
                ref={register({
                  required: "Select category name.",
                })}
                name="ProdId"
              >
                <option value="">Select Product</option>
                {productData.map((item, index) => (
                  <option key={index} value={item.ProdId}>
                    {item.PName}
                  </option>
                ))}
              </select>
              {errors.ProdId && (
                <span className="text-danger">{errors.ProdId.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Color Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter color name.",
                })}
                name="ColorName"
              />
              {errors.ColorName && (
                <span className="text-danger">{errors.ColorName.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Color Code*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter color Code.",
                })}
                name="Code"
              />
              {errors.Code && (
                <span className="text-danger">{errors.Code.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Select Image*</label>
              <input
                type="file"
                className="form-control"
                ref={register}
                name="Image"
                accept="image/*"
              />
              {errors.Image && (
                <span className="text-danger">{errors.Image.message}</span>
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

export default ColorForm;
