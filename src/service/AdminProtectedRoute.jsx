import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminProtectedRoute = ({ component: Comp, ...rest }) => {
 return(
 <Route
    {...rest}
    render=
    {(props) => 
      localStorage.getItem("AdminLogin") ? (
        <Comp {...props} />
      ) : (
        <Redirect to="/admin" />
      )
    }
  />
 )
};

export default AdminProtectedRoute;
