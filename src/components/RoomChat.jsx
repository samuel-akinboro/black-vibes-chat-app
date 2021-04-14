import { IconButton } from '@material-ui/core';
import { InsertEmoticon, Mic, Send, Star } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import './component-stylesheet/RoomChat.css'
import { useParams } from 'react-router-dom'
import {database} from '../Firebase/Firebase'
import { useStateValue } from '../state-management/StateProvider';

function RoomChat({type}) {
  const { roomId } = useParams();
  const [roomMessage, setRoomMessage] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [email, setEmail] = useState("");
  const [state] = useStateValue();
  const [input, setInput] = useState("");
  // const [friendMessage, setFriendMessage] = useState([]);

  
  useEffect(() => {
    if (type === "room") {
      database.collection('rooms').doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name))

      database.collection("rooms").doc(roomId).collection("message").onSnapshot(snapshot => setRoomMessage(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))))
    } else {
      database.collection('users').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
        setEmail(snapshot.data().email)
      })

      database.collection("users").onSnapshot(snapshot => {
        // getting your account id
        let users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        let you = users.filter(user => user.email === state.user.email)

      if (you){
          database.collection("users").doc(you[0].id).collection("allMessages").onSnapshot(snapshot => {

          // getting the id of the person you want to send the message to
          const friends = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          const friend = friends.filter(doc => doc.email === email);

          database.collection("users").doc(you[0].id).collection("allMessages")
            .doc(friend[0].id).collection("message").onSnapshot(snapshot => setRoomMessage(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))))
          
        });
      }

      })
    }
  }, [roomId, email, state.user.email, type]);

  if (type === "room") {
    
  } else {
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
    return (
      <div className="room__chat">
        <div className="room__chat__header">
          <div className="info">
            <div className="room__name">
              <span>#</span>
              <h2>{roomName}</h2>
            </div>
            <div className="number__of__members">
              <span>6 members</span>
              <button>+ Add member</button>
            </div>
          </div>
          <div className="icons">
            <IconButton className="room__headerIcons">
              <Star />
            </IconButton>
            <IconButton className="room__headerIcons">
              <Star />
            </IconButton>
            <IconButton className="room__headerIcons">
              <Star />
            </IconButton>
            <IconButton className="room__headerIcons">
              <Star />
            </IconButton>
            <IconButton className="room__headerIcons">
              <Star />
            </IconButton>
          </div>
        </div>
        <div className="room__chat__body">
          <p className="message sender">
            <span className="name">You</span>
            How are you doing
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p>

          <p className="message">
            <span className="name">john snow</span>
            I'm fine, what about you
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p>

          <p className="message sender">
            <span className="name">You</span>
            How are you doing
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p>

          <p className="message">
            <span className="name">john snow</span>
            I'm fine, what about you
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p>

          {roomMessage.map((message) => (
            <p className="message sender">
              <span className="name">You</span>
              {message.message}
              <span className="timestamp">{new Date().toUTCString()}</span>
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <div className="form__container">
            <Mic style={{ marginRight: "5px" }} />
            <form action="" onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter message..." value={input} onChange={ (e)=> setInput(e.target.value)}/>
              <InsertEmoticon className="emoji" />
              <IconButton className="send__button">
                <Send style={{ color: "white" }} />
              </IconButton>
            </form>
          </div>
        </div>
      </div>
    );
}

export default RoomChat
