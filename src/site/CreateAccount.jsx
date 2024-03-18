import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function CreateAccount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const { register, handleSubmit, errors, getValues, setValue, reset, watch } =
    useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");

  const pincodeChange = (e) => {
    if (watch("Pincode").length == 6) {
      setIsLoading(true);
      Service.getPostalData(watch("Pincode")).then((res) => {
        setIsLoading(false);
        if (res.data[0].PostOffice) {
          setValue("State", res.data[0].PostOffice[0].State, {
            shouldValidate: true,
          });
          setValue("City", res.data[0].PostOffice[0].Block, {
            shouldValidate: true,
          });
        } else {
          setValue("Pincode", null, { shouldValidate: true });
          setValue("State", null);
          setValue("City", null);
        }
      });
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    Service.createAccount(data).then((res) => {
      if (res.data.success) {
        reset(null);
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        localStorage.setItem("UserId", res.data.UserId);
        history.push("/verify-otp");
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
        <h1>Sign Up</h1>
        <p>Create a New Account</p>
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
          <div className="col-sm-3">
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter first name",
                })}
                name="FName"
              />
              {errors.FName && (
                <span className="text-danger">{errors.FName.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          {/* End .col-sm-4 */}

          <div className="col-sm-3">
            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter last name",
                })}
                name="LName"
              />
              {errors.LName && (
                <span className="text-danger">{errors.LName.message}</span>
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

          <div className="col-sm-3">
            <div className="form-group">
              <label>Phone*</label>
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
                    message: "Enter valid contact.",
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

          <div className="col-sm-3">
            <div className="form-group">
              <label>Pincode*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter pincode.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter only numbers.",
                  },
                  minLength: {
                    value: 6,
                    message: "Enter valid pincode.",
                  },
                  maxLength: {
                    value: 6,
                    message: "Enter valid pincode.",
                  },
                })}
                name="Pincode"
                onChange={pincodeChange}
              />
              {errors.Pincode && (
                <span className="text-danger">{errors.Pincode.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label>City*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter city",
                })}
                name="City"
                readOnly
              />
              {errors.City && (
                <span className="text-danger">{errors.City.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter state",
                })}
                name="State"
                readOnly
              />
              {errors.State && (
                <span className="text-danger">{errors.State.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Address Line 1*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter address",
                })}
                name="Address1"
              />
              {errors.Address1 && (
                <span className="text-danger">{errors.Address1.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Address Line 2*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter address",
                })}
                name="Address2"
              />
              {errors.Address2 && (
                <span className="text-danger">{errors.Address2.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                className="form-control"
                ref={register({
                  required: "Set password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password is not more than 10 characters.",
                  },
                })}
                name="Pass"
              />
              {errors.Pass && (
                <span className="text-danger">{errors.Pass.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label>Confirm Password*</label>
              <input
                type="password"
                className="form-control"
                ref={register({
                  required: "Set confirm password",
                  validate: (value) =>
                    value === getValues("Pass") || "Password does not match.",
                })}
                name="ConfirmPass"
              />
              {errors.ConfirmPass && (
                <span className="text-danger">
                  {errors.ConfirmPass.message}
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
            value="SIGN Up"
          />
        </div>
        {/* End .form-action */}
      </form>
    </div>
  );
}

export default CreateAccount;
