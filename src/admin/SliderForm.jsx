import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function SliderForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, setValue, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    loadSliderData();
  }, []);

  const loadSliderData = () => {
    if (localStorage.getItem("PageName") == "Edit Slider") {
      let sliderData = JSON.parse(localStorage.getItem("SliderDataForEdit"));
      reset({
        Heading: sliderData.Heading,
        Url: sliderData.Url,
      });
    }
  };

  const onSubmit = (data) => {
    if (localStorage.getItem("PageName") == "Add New Slider") {
      addNewRecord(data);
    } else if (localStorage.getItem("PageName") == "Edit Slider") {
      updateRecord(data);
    }
  };

  const addNewRecord = (data) => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("Heading", data.Heading);
    fd.append("Url", data.Url);
    fd.append("Image", data.Image[0]);
    Service.addNewSlider(fd).then((res) => {
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
    var sliderData = JSON.parse(localStorage.getItem("SliderDataForEdit"));
    let fd = new FormData();
    fd.append("SId", sliderData.SId);
    fd.append("Heading", data.Heading);
    fd.append("Url", data.Url);
    fd.append("Image", data.Image[0]);
    Service.updateSlider(fd).then((res) => {
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
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Url*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter Url.",
                })}
                name="Url"
              />
              {errors.Url && (
                <span className="text-danger">{errors.Url.message}</span>
              )}
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <label>Slider Image*</label>
              <input
                type="file"
                className="form-control"
                ref={register}
                name="Image"
              />
              {errors.Image && (
                <span className="text-danger">{errors.Image.message}</span>
              )}
            </div>
          </div>
        </div>

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

export default SliderForm;
