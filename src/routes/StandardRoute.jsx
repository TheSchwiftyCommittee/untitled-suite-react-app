import React from "react";
import { Route } from "react-router-dom";

export const StandardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return (
          <>
            <Component {...rest} />
          </>
        );
      }}
    ></Route>
  );
};
