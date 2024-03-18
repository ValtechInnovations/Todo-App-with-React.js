import React, { useState, useEffect } from "react";

function ResetPass() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="col-md-9 col-md-push-3">
      <div className="page-header text-center">
        <h1>Reset Password</h1>
      </div>
    </div>
  );
}

export default ResetPass;
