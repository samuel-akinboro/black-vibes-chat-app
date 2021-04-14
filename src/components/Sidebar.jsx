import React, {useState, useEffect} from 'react'
import './component-stylesheet/Sidebar.css'
import {Add, Search} from '@material-ui/icons'
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../state-management/StateProvider'
import {database} from '../Firebase/Firebase'
import {Link} from 'react-router-dom'

function Sidebar() {
<<<<<<< HEAD
  const [state, dispatch] = useStateValue();
=======
  const [state] = useStateValue();
>>>>>>> 54c1294 (glassmorphism)
  const [messages, setMessages] = useState([]);
  // const [friends, setFriends] = useState([]);

  const friendsList = state.friends.filter(friend => friend.email !== state.user.email);


  useEffect(() => {
    const unsubscribe = database.collection('rooms').onSnapshot(snapshot => setMessages(snapshot.docs.map(room => ({
      id: room.id,
      ...room.data()
    }))));
    return () => unsubscribe();
   }, []);

  // setFriends(state.friends)

  const createGroupChat = (e) => {
    const groupName = prompt("Enter Group Name");
    const category = "group";

    if (groupName) {
      database.collection("rooms").add({
        name: groupName,
        category
      });
    }
   }

    return (
      <div className="sidebar">
        <div className="sidebar__search">
          <input type="search" placeholder="Search" />
          <Search />
        </div>

        <div className="sidebar__favorite">
          <div className="flex">
            <h2>FAVORITES</h2>
            <Add onClick={createGroupChat} />
          </div>
          {messages
            .filter((message) => message.category === "group")
            .map((message) => (
              <Link className="message-link" to={`/group/${message.id}`} key={message.id}>
                <div className="single__favorite">
                  <p>
                    <span>#</span> {message.name}
                  </p>
                </div>
              </Link>
            ))}
        </div>

        <div className="direct__messages">
          <div className="flex">
            <h2>DIRECT MESSAGES</h2>
            <Add />
          </div>

          {/* List of friends */}
          
          {
            friendsList.map(singleFriend => (
              <Link className="single__message" to={`/message/${singleFriend.id}`} key={singleFriend.email}>
                <Avatar
                  style={{ height: "35px", width: "35px" }}
                  src={singleFriend.photoURL}
                />
                <h3>{singleFriend.name}</h3>
                <span>2</span>
              </Link>
            ))
          }

        </div>
      </div>
    );
}

export default Sidebar
