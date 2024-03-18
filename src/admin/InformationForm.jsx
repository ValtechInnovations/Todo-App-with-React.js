import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function InformationForm() {
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
    loadInfoData();
  }, []);

  const loadProduct = () => {
    setIsLoading(true);
    Service.getAllProducts().then((res) => {
      setProductData(res.data);
      setIsLoading(false);
    });
  };

  const loadInfoData = () => {
    if (localStorage.getItem("PageName") == "Edit Specification") {
      let infoData = JSON.parse(localStorage.getItem("InfoDataForEdit"));
      reset(infoData);
    }
  };

  const onSubmit = (data) => {
    if (localStorage.getItem("PageName") == "Add New Specification") {
      addNewRecord(data);
    } else if (localStorage.getItem("PageName") == "Edit Specification") {
      updateRecord(data);
    }
  };

  const addNewRecord = (data) => {
    setIsLoading(true);
    Service.addNewInfo(data).then((res) => {
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
    var infoData = JSON.parse(localStorage.getItem("InfoDataForEdit"));
    data.InfoId = infoData.InfoId;
    Service.updateInfo(data).then((res) => {
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
                  required: "Select product name.",
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
              <label>Heading*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter heading.",
                })}
                name="Heading"
              />
              {errors.Heading && (
                <span className="text-danger">{errors.Heading.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Description*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter description.",
                })}
                name="Description"
              />
              {errors.Description && (
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

export default InformationForm;
