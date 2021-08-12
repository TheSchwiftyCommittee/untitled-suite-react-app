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
          return <Component key="component" {...rest} {...props} />;
        } else {
          return (
            <Redirect key="signin" to={{ pathname: "/signin", state: { from: props.location } }} />
          );
        }
      }}
    ></Route>
  );
};
