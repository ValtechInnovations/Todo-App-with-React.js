import React from "react";

function User({ children }) {
  return (
    <div>
      <h1>user layout</h1>
      {children}
    </div>
  );
};

export default User;