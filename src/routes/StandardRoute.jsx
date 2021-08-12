import React from "react";
import { Route } from "react-router-dom";
import { Footer } from "../components/footer/Footer";

export const StandardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return (
          <>
            <Component {...rest} />
            <Footer />
          </>
        );
      }}
    ></Route>
  );
};
