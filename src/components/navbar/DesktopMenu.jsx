import React from "react";
import { NavLink } from "react-router-dom";

import { Button, ButtonGroup } from "@material-ui/core";
import { AccessButtons } from "./NavAccessButtons";
import { TopMenuBar } from "./TopMenuBar";

export const DesktopMenu = (props) => {
  const { admin, user, handleLogoutClick } = props;

  return (
    <>
      <ButtonGroup color="inherit" aria-label="text primary button group">
        <TopMenuBar admin={admin} />
      </ButtonGroup>

      <ButtonGroup color="inherit" aria-label="text primary button group">
        {!user && <AccessButtons />}
        {user && (
          <Button
            variant="text"
            component={NavLink}
            to="/"
            onClick={handleLogoutClick}
          >
            Sign Out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
};
