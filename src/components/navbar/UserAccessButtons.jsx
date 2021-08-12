import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const UserAccessButtons = (props) => {
  const { handleLogoutClick } = props;

  return (
    <>
      <Button
        id="filled-adornment-profilebutton"
        variant="text"
        component={NavLink}
        to="/profile"
      >
        Profile
      </Button>
      <Button
        variant="text"
        component={NavLink}
        to="/"
        onClick={handleLogoutClick}
      >
        Sign Out
      </Button>
    </>
  );
};
