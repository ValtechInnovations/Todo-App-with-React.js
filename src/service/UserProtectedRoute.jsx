import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserProtectedRoute = ({ component: Comp, ...rest }) => {
 return(
 <Route
    {...rest}
    render=
    {(props) => 
      localStorage.getItem("UserLogin") ? (
        <Comp {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
 )
};

export default UserProtectedRoute;
