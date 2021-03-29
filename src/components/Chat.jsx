import React from 'react'
import './component-stylesheet/Chat.css'
import RoomChat from './RoomChat'
import RoomInfo from './RoomInfo'

function Chat({type}) {
    return (
        <div className="chat">
            <RoomChat type={type} />
            <RoomInfo />
        </div>
    )
}

export default Chat
