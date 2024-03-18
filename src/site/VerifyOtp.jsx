import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function VerifyOtp() {
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
    data.UserId = localStorage.getItem("UserId");
    Service.verifyOtp(data).then((res) => {
      if (res.data.success) {
        history.push("/welcome");
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
        <h1>Verify OTP</h1>
        <p>Enter OTP For Account Verification</p>
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
          <label>Enter OTP*</label>
          <input
            className="form-control"
            ref={register({
              required: "Enter OTP.",
            })}
            name="Otp"
          />
        </div>
        {/* End .form-group */}

        <div className="clearfix form-action">
          <input
            type="submit"
            className="btn btn-accent pull-right min-width"
            value="Verify"
          />
        </div>
        {/* End .form-action */}
      </form>
    </div>
  );
}

export default VerifyOtp;
