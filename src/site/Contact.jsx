import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useForm } from "react-hook-form";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, errors, getValues, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [orgData, setOrgData] = useState([]);
  useEffect(() => {
    loadOrgData();
  }, []);

  const loadOrgData = () => {
    setIsLoading(true);
    Service.getOrgData().then((res) => {
      setOrgData(res.data);
      setIsLoading(false);
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    Service.sendEnquiry(data)
      .then((res) => {
        reset(null);
        if (res.data.success) {
          setShowMsg(true);
          setMsgClass("alert alert-success alert-dismissible");
          setMsgText(res.data.success)
        }
        setIsLoading(false);
      })
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header text-center">
        <h1>Contact Us</h1>
        <p>Check Out How to Contact Us</p>
      </div>
      {/* End .page-header */}

      <div className="mb20"></div>
      {/* margin */}

      {orgData.map((item, i) => (
        <div className="row" key={i}>
          <div className="col-sm-4">
            <div className="contact-info-box">
              <img src="assets/images/icon-pin.png" alt="Pin" />
              <h3>Address</h3>
              <address>
                <span>{item.Address}</span>
              </address>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="contact-info-box">
              <img src="assets/images/icon-mobile.png" alt="Pin" />
              <h3>Phone</h3>
              <p>
                {item.Contact}
              </p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="contact-info-box">
              <img src="assets/images/icon-email.png" alt="Pin" />
              <h3>Email</h3>
              <p>
                <a
                  href={
                    "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" +
                    item.Email
                  }
                >
                  {item.Email}
                </a>
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="mb35 mb20-sm mb10-xs"></div>
      {/* margin */}

      <div className="title-group text-center">
        <h2 className="title">Send a Message</h2>
        <p className="title-desc">Send Us a Message</p>
      </div>
      {/* End .title-group */}

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {showMsg == true ? (
            <div className="col-sm-12">
              <div
                //className="alert alert-success alert-dismissible"
                className={msgClass}
                role="alert"
              >
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
            </div>
          ) : null}

          <div className="col-sm-4">
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                className="form-control"
                ref={register({
                  required: "Enter your name",
                  minLength: {
                    value: 2,
                    message: "Enter valid name",
                  },
                })}
                name="Name"
              />
              {errors.Name && (
                <span className="text-danger">{errors.Name.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          <div className="col-sm-4">
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
                    message: "Enter valid contact.",
                  },
                })}
                name="Contact"
              />
              {errors.Contact && (
                <span className="text-danger">{errors.Contact.message}</span>
              )}
            </div>
          </div>

          <div className="col-sm-4">
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
          {/* End .col-sm-6 */}

          <div className="col-sm-12">
            <div className="form-group">
              <label>Message*</label>
              <textarea
                cols="30"
                rows="6"
                className="form-control"
                ref={register({
                  required: "Describe your query.",
                  minLength: {
                    value: 20,
                    message: "Enter at least 20 characters.",
                  },
                })}
                name="Msg"
              ></textarea>
              {errors.Msg && (
                <span className="text-danger">{errors.Msg.message}</span>
              )}
            </div>
            {/* End .form-group */}
          </div>
          {/* End .col-sm-6 */}
        </div>
        {/* End .row */}

        <div className="clearfix text-right">
          <input
            type="submit"
            className="btn btn-accent min-width"
            value="Send Message"
          />
        </div>

        {/* End .clearfix */}
      </form>
    </div>
  );
}

export default Contact;
