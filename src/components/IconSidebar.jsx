import { Vibration } from '@material-ui/icons'
import React from 'react'
import './component-stylesheet/IconSidebar.css'
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../state-management/StateProvider';

function IconSidebar() {
  const [{user}, dispatch] = useStateValue();
    return (
      <div className="icon-sidebar">
        <div className="icon__sidebar__header">
          <Vibration style={{ color: "#FFC101" }} />
        </div>
        <div className="icon__sidebar__center">
          <Vibration />
          <Vibration />
          <Vibration />
          <Vibration />
          <Vibration />
          <Vibration />
        </div>
        <div className="icon__sidebar__footer">
          <NotificationsNoneIcon />
          <Avatar
            style={{ height: "35px", width: "35px", cursor: "pointer" }}
            src={user && user.photoURL}
          />
        </div>
      </div>
    );
}

export default IconSidebar
