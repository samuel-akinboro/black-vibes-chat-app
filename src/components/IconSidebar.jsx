import { Vibration } from '@material-ui/icons'
import React, { useState } from 'react'
import './component-stylesheet/IconSidebar.css'
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../state-management/StateProvider';
import {motion} from 'framer-motion';

function IconSidebar() {
  const [{user}, dispatch] = useStateValue();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false)
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
            onClick={()=> !isLogOutModalOpen ? setIsLogOutModalOpen(true) : setIsLogOutModalOpen(false)}
          />
          {isLogOutModalOpen && 
          <motion.div 
          className="log-out-modal"
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: [0, 1], scale: [0, 1]}}
          transition={{duration: 0.3}}
          >
            <button onClick={()=> dispatch({type: "LOG_OUT"})}>Log out</button>
          </motion.div>}
        </div>
      </div>
    );
}

export default IconSidebar
