import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const TopMenuBar = (props) => {
  const { admin } = props;

  return (
    <>
      <Button variant="text" component={NavLink} to="/tasker">
        Tasker
      </Button>
      <Button variant="text" component={NavLink} to="#">
        Calendar
      </Button>
      {admin && (
        <Button variant="text" component={NavLink} to="#">
          Users
        </Button>
      )}
      <Button variant="text" component={NavLink} to="/pricing">
        Pricing
      </Button>
    </>
  );
};
