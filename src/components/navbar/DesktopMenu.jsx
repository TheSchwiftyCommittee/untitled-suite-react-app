import React from "react";

import { ButtonGroup } from "@material-ui/core";
import { GuestAccessButtons } from "./GuestAccessButtons";
import { TopMenuBar } from "./TopMenuBar";
import { UserAccessButtons } from "./UserAccessButtons";

export const DesktopMenu = (props) => {
  const { admin, user, handleLogoutClick } = props;

  return (
    <>
      <ButtonGroup color="inherit" aria-label="text primary button group">
        <TopMenuBar admin={admin} />
      </ButtonGroup>

      <ButtonGroup color="inherit" aria-label="text primary button group">
        {!user && <GuestAccessButtons />}
        {user && <UserAccessButtons handleLogoutClick={handleLogoutClick} /> }
      </ButtonGroup>
    </>
  );
};
