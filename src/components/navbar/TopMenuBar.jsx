import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const TopMenuBar = (props) => {
  const { adminDirector, admin } = props;

  const adminCheck = () => {
    return admin || adminDirector ? true : false
  } 

  return (
    <>
      <Button variant="text" component={NavLink} to="/tasker">
        Tasker
      </Button>
      <Button variant="text" component={NavLink} to="#">
        Calendar
      </Button>
      {adminCheck() && (
        <Button variant="text" component={NavLink} to="/users">
          Users
        </Button>
      )}
      <Button variant="text" component={NavLink} to="/pricing">
        Pricing
      </Button>
    </>
  );
};
