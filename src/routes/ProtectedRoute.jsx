import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  user,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
          );
        }
      }}
    ></Route>
  );
};
