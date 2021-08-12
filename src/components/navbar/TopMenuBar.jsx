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
      <Button id="filled-adornment-taskerbutton" variant="text" component={NavLink} to="/tasker">
        Tasker
      </Button>
      {/* <Button variant="text" component={NavLink} to="#">
        Calendar
      </Button> */}
      {adminCheck() && (
        <Button id="filled-adornment-userbutton" variant="text" component={NavLink} to="/users">
          Users
        </Button>
      )}
      <Button id="filled-adornment-pricingbutton" variant="text" component={NavLink} to="/pricing">
        Pricing
      </Button>
    </>
  );
};
