import React, { useState } from 'react'
import { IconButton } from "@material-ui/core";
import './component-stylesheet/RoomInfo.css'
import { Clear } from '@material-ui/icons'

function RoomInfo() {
  const [showGroupInfo, setShowGroupInfo] = useState(true);
    const infoState = showGroupInfo ? "flex" : "none";

    const handleShowGroupInfo = () => {
        // toggles the appearance of a group info
        setShowGroupInfo(!showGroupInfo)
    }

    return (
        <div className="room__info" style={{ display: `${infoState}` }}>
        <div className="room__info__header">
          <div className="room__info__details">
            <h2>Group info</h2>
            <p className="date-created">Created 21/2/2021</p>
            <IconButton className="room__headerIcons" onClick={handleShowGroupInfo}>
              <Clear />
            </IconButton>
          </div>
        </div>
      </div>
    );
}

export default RoomInfo
