import React from "react";
import Controls from "../controls/Controls";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

const AdminButtons = (props) => {
  const { handleDelete, handleUpdate, id, admin } = props;

  return (
    <div>
      <Controls.ActionButton onClick={() => handleUpdate(id)}>
        {admin ? <GetAppIcon fontSize="small" color="disabled"/> : <PublishIcon fontSize="small" color="action"/>}
      </Controls.ActionButton>
      <Controls.ActionButton color="error" onClick={() => handleDelete(id)}>
        {admin ? <DeleteForeverIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
      </Controls.ActionButton>
    </div>
  );
};

export default AdminButtons;
