import { IconButton } from '@material-ui/core';
import { InsertEmoticon, Mic, Send, Star } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import './component-stylesheet/RoomChat.css'
import { useParams } from 'react-router-dom'
import {database} from '../Firebase/Firebase'
import { useStateValue } from '../state-management/StateProvider';
import firebase from 'firebase';

function RoomChat({type}) {
  const { roomId } = useParams();
  const [roomMessage, setRoomMessage] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [email, setEmail] = useState("");
  const [state] = useStateValue();
  const [input, setInput] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [chatBuddy, setChatBuddy] = useState(null)
  // const [friendMessage, setFriendMessage] = useState([]);

  
  useEffect(() => {
      // database.collection('rooms').doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name))
      const presentRoom = type === "room" ? state.rooms.filter(room => room.id === roomId) : state.friends.filter(room => room.id === roomId);
      setRoomName(presentRoom[0].name)
      setEmail(presentRoom[0].email)
       
      if (type === "room") {
        database.collection("rooms").doc(roomId).collection("message").orderBy('timestamp', 'asc').onSnapshot(snapshot => setRoomMessage(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))))
      } else {

      database.collection("users").onSnapshot(snapshot => {
        // getting your account id
        let users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        let you = users.filter(user => user.email === state.user.email)[0]
        setLoggedInUser(you);

      if (you){
          database.collection("users").doc(you.id).collection("allMessages").onSnapshot(snapshot => {

          // getting the id of the person you want to send the message to
         

          const friend = state.friends.filter(friend => friend.email === presentRoom[0].email);
          setChatBuddy(friend[0])

          database.collection("users").doc(you.id).collection("allMessages")
            .doc(friend[0].id).collection("message").orderBy('timestamp', 'asc').onSnapshot(snapshot => setRoomMessage(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))))
          
        });
      }

      })
    }
  }, [roomId]);


  const handleSubmit = (e) => {
    e.preventDefault()
    if (type === "room") {
      database.collection("rooms").doc(roomId).collection("message").add({
        name: state.user.name,
        message: input,
        email: state.user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

      setInput("")
    }else{
      database.collection("users").doc(loggedInUser.id).collection("allMessages")
      .doc(chatBuddy.id).collection("message").add({
        name: state.user.name,
        message: input,
        email: state.user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      database.collection("users").doc(chatBuddy.id).collection("allMessages")
      .doc(loggedInUser.id).collection("message").add({
        name: state.user.name,
        message: input,
        email: state.user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setInput("")
    }
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
          </div>
        </div>
        <div className="room__chat__body">
          {/* <p className="message sender">
            <span className="name">You</span>
            How are you doing
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p>

          <p className="message">
            <span className="name">john snow</span>
            I'm fine, what about you
            <span className="timestamp">{new Date().toUTCString()}</span>
          </p> */}

          {roomMessage.map((message) => (
            <p className={`message ${message.email === state.user.email ? "sender" : ""}`} key={message.id}>
              <span className="name">{message.email === state.user.email ? "You" : message.name}</span>
              {message.message}
              <span className="timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <div className="form__container">
            <Mic style={{ marginRight: "5px" }} />
            <form action="" onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter message..." value={input} onChange={ (e)=> setInput(e.target.value)}/>
              <InsertEmoticon className="emoji" />
              <IconButton className="send__button" onClick={handleSubmit}>
                <Send style={{ color: "white" }} />
              </IconButton>
            </form>
          </div>
        </div>
      </div>
    );
}

export default RoomChat
