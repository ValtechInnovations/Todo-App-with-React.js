import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function AdminProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, setValue, reset, watch } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    errors: errors1,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    Service.getOrgData().then((res) => {
      reset(res.data[0]);
      setIsLoading(false);
    });
  };

  const onSubmitLogo = (data) => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("Logo", data.Logo[0]);
    Service.updateLogo(fd).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
      }
      setIsLoading(false);
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    Service.updateOrgProfile(data).then((res) => {
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
        <h1>Edit Profile</h1>
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
        onSubmit={handleSubmit1(onSubmitLogo)}
        className="signup-form"
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label>Select Logo*</label>
              <input
                type="file"
                className="form-control"
                ref={register1({
                  required: "Select logo.",
                })}
                name="Logo"
                accept="image/*"
              />
              {errors1.Logo && (
                <span className="text-danger">{errors1.Logo.message}</span>
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
            value="Update Logo"
          />
        </div>
        {/* End .form-action */}
      </form>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="signup-form"
      >
        <div className="row">
          <div className="col-sm-3">
            <div className="form-group">
              <label>Org Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter name",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters are required",
                  },
                  // pattern: {
                  //   value: /^\S*$/,
                  //   message: "Only space is not allowed.",
                  // },
                })}
                name="OrgName"
              />
              {errors.OrgName && (
                <span className="text-danger">{errors.OrgName.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          {/* End .col-sm-4 */}

          <div className="col-sm-3">
            <div className="form-group">
              <label>Contact*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter your contact.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter only numbers.",
                  },
                  minLength: {
                    value: 10,
                    message: "Enter 10 digit contact no.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Enter 10 digit contact no.",
                  },
                })}
                name="Contact"
              />
              {errors.Contact && (
                <span className="text-danger">{errors.Contact.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                className="form-control"
                ref={register({
                  required: "Enter your email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter valid email address.",
                  },
                })}
                name="Email"
              />
              {errors.Email && (
                <span className="text-danger">{errors.Email.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          {/* End .col-sm-4 */}

          <div className="col-sm-6">
            <div className="form-group">
              <label>FB Link*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter facebook link",
                })}
                name="FBLink"
              />
              {errors.FBLink && (
                <span className="text-danger">{errors.FBLink.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Instagram Link*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter instagram link",
                })}
                name="InstaLink"
              />
              {errors.InstaLink && (
                <span className="text-danger">{errors.InstaLink.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Whatsapp Link*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter whatsapp link",
                })}
                name="WhatsappLink"
              />
              {errors.WhatsappLink && (
                <span className="text-danger">
                  {errors.WhatsappLink.message}
                </span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Youtube Link*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter youtube link",
                })}
                name="YoutubeLink"
              />
              {errors.YoutubeLink && (
                <span className="text-danger">
                  {errors.YoutubeLink.message}
                </span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-12">
            <div className="form-group">
              <label>Address*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter address",
                })}
                name="Address"
              />
              {errors.Address && (
                <span className="text-danger">{errors.Address.message}</span>
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
            value="Update Profile"
          />
        </div>
        {/* End .form-action */}
      </form>
    </div>
  );
}

export default AdminProfile;
