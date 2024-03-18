import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function AdminLogin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");

  const onSubmit = (data) => {
    setIsLoading(true);
    Service.adminLogin(data).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        localStorage.setItem("AdminLogin", res.data.UserId);
        history.push("/admin/profile");
        //window.location.reload();
      } else {
        setShowMsg(true);
        setMsgClass("alert alert-danger alert-dismissible");
        setMsgText(res.data.warning);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header text-center">
        <h1>Admin Login</h1>
        <p>Signin To Your Account</p>
      </div>
      {/* End .page-header */}

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="signin-form"
      >
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
        <div className="form-group">
          <label>Contact*</label>
          <input
            type="text"
            className="form-control"
            ref={register({
              required: "Enter contact.",
            })}
            name="Contact"
          />
          {errors.Contact && (
            <span className="text-danger">{errors.Contact.message}</span>
          )}
        </div>
        {/* End .form-group */}

        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            className="form-control"
            ref={register({
              required: "Enter password",
            })}
            name="Pass"
          />
          {errors.Pass && (
            <span className="text-danger">{errors.Pass.message}</span>
          )}
        </div>
        {/* End .form-group */}

        <div className="clearfix form-more">
          <div className="checkbox pull-left">
            <label>
              <input type="checkbox" name="remember" />
              <span className="checkbox-box">
                <span className="check"></span>
              </span>
              Remember Me
            </label>
          </div>
          {/* End .checkbox */}
          <a href="#" className="help-link">
            LOST YOUR PASSWORD?
          </a>
        </div>
        {/* End .form-more */}

        <div className="clearfix form-action">
          <input
            type="submit"
            className="btn btn-accent pull-right min-width"
            value="Login"
          />
        </div>
        {/* End .form-action */}
      </form>
    </div>
  );
}

export default AdminLogin;
