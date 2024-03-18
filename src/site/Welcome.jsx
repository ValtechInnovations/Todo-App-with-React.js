import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Welcome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const shopping = () => {
    history.push("/login");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      <div className="page-header text-center">
        <h1>Your account has been created successfully..!</h1>
      </div>
      {/* End .page-header */}

      <form action="#" className="signin-form">
        <div className="clearfix form-action">
          <input
          onClick={()=>shopping()}
            type="submit"
            className="btn btn-accent center-block min-width"
            value="Login into your account"
          />
        </div>
        {/* End .form-action */}
      </form>
    </div>
  );
}

export default Welcome;
