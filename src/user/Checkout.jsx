import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function Checkout(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const { register, handleSubmit, errors, setValue, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    Service.getProfileData(localStorage.getItem("UserLogin")).then((res) => {
      reset(res.data[0]);
      setUserData(res.data[0]);
      setIsLoading(false);
    });
  };

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
    data.UserId = localStorage.getItem("UserLogin");
    data.NetTotal = localStorage.getItem("TotalAmount");
    data.OrderStatus = "Order Confirmed";
    data.Contact = userData.Contact;
    data.FName = userData.FName;
    data.LName = userData.LName;
    if (data.PaymentMode == "COD") {
      data.PaymentStatus = "Pending";
      data.RazorpayPaymentId = "No";
      saveOrder(data);
    } else if (data.PaymentMode == "Online") {
      payOnline(data);
    }
  };

  const loadCartCount = () => {
    if (localStorage.getItem("UserLogin")) {
      setIsLoading(true);
      Service.getCartCount(localStorage.getItem("UserLogin")).then((res) => {
        props.addToCartHandler(res.data[0].Count);
        setIsLoading(false);
      });
    }
  };

  const saveOrder = (data) => {
    setIsLoading(true);
    Service.placeOrder(data).then((res) => {
      if (res.data.success) {
        localStorage.setItem("OrderDetails", JSON.stringify(res.data));
        history.push("/order-status");
      }
      loadCartCount();
      setIsLoading(false);
    });
  };

  const payOnline = (data) => {
    var options = {
      key: "rzp_live_vcEKN3uRxraa6T",
      amount: data.NetTotal * 100, //  = INR 1
      name: "Master Computer",
      description: "The Computer World",
      image:
        "https://master.computer.edumaster.co.in/master-computer-api/uploads/logo/Logo-1684499357559.png",
      handler: function (response) {
        data.PaymentStatus = "Paid";
        data.RazorpayPaymentId = response.razorpay_payment_id;
        saveOrder(data);
      },
      prefill: {
        name: userData.FName + " " + userData.LName,
        contact: userData.Contact,
        email: userData.Email,
      },
      notes: {
        address:
          userData.Address1 +
          ", " +
          userData.Address2 +
          ", " +
          userData.City +
          ", " +
          userData.Pincode +
          ", " +
          userData.State,
      },
      theme: {
        color: "#272F6E",
        hide_topbar: false,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header text-center">
        <h1>Checkout</h1>
        <p>Checkout Your Products</p>
      </div>

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

      <h3>BILLING ADDRESS</h3>
      <hr />
      <div className="mb15"></div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="signup-form"
      >
        <div className="row">
          <div className="col-sm-4">
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

          <div className="col-sm-4">
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

          <div className="col-sm-4">
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

          <div className="col-sm-12">
            <label>Payment Mode :</label>
            <div>
              {errors.PaymentMode && (
                <span className="text-danger">
                  {errors.PaymentMode.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="checkout-option"
                    ref={register({
                      required: "Select payment mode.",
                    })}
                    name="PaymentMode"
                    value="Online"
                  />
                  <span className="check"></span>
                  <span className="circle"></span>
                  Online
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="form-group">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="checkout-option"
                    ref={register({
                      required: "Select payment mode.",
                    })}
                    name="PaymentMode"
                    value="COD"
                  />
                  <span className="check"></span>
                  <span className="circle"></span>
                  Cash on delivery (COD)
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="clearfix form-action">
          <input
            type="submit"
            className="btn btn-accent min-width pull-right"
            value="Place Order"
          />
        </div>
        {/* End .form-action */}
      </form>
      <div className="mb50"></div>
    </div>
  );
}

export default Checkout;
