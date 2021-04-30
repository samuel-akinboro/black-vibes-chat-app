import React, { useState, useEffect } from 'react'
import './component-stylesheet/Login.css'
import { auth, provider, database } from '../Firebase/Firebase'
import {useStateValue} from '../state-management/StateProvider'
import { Clear } from '@material-ui/icons'

function Login() {
  const [state, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    const unsubscribe = database.collection('users').onSnapshot(snapshot => {
      const allFriends = snapshot.docs.map(friend => ({
        id: friend.id,
        ...friend.data()
      }));

      
      
    dispatch({
      type: "SET_FRIENDS",
      friends: allFriends
    })
    
    });

    database.collection('rooms').onSnapshot(snapshot => {
      const allRooms = snapshot.docs.map(room => ({
        id: room.id,
        ...room.data()
      }));

      
      
    dispatch({
      type: "SET_ROOMS",
      rooms: allRooms
    })
    
    });
    return () => unsubscribe()
   })

  const handleLogin = (e) => {
    setIsLoading(true)
    auth.signInWithPopup(provider)
  .then((result) => {
    const user = result.user;

    // the details we need
    const neededDetails = {
      name: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      email: user.email
    }; 

    dispatch({
      type: "SET_USER",
      user: neededDetails
    })

    // checks if user already has an account

    user.email && state.friends.length > 0 && setTimeout(()=>{
       const alreadyHasAnAccount = state.friends.some(friend => friend.email === user.email);
        if (alreadyHasAnAccount) {
          
        } else {
          database.collection('users').add(neededDetails)
        }
      }, 5000)
    
    
  }).catch((error) => {
    const errorMessage = error.message;
    setIsError(true)
    setIsLoading(false)
    console.log(errorMessage)
  });
  }

  const buttonStyle = isLoading ? {
    // backgroundColor: "#9a650c",
    color: "rgb(230, 226, 226)",
    paddingRight: "20px"
  } : {};

  // clear the erro message modal
  const clearErrorMessage = () =>{
    setIsError(false)
  }

  return (
    <div className="login">
      <div className="login__container">
        {isError && <div className="error__message" onClick={clearErrorMessage}>Bad Internet Connection <Clear /></div>}
          <div className="spin"> B </div>
          <h2>Black Vibes Messanger</h2>
          <button onClick={handleLogin} style={buttonStyle} > 
            {isLoading && <div className="smallLoading" style={{marginRight: "7px"}}></div>}
            {isLoading ? "Hold On" : "Login with Google"}
          </button>
      </div>
    </div>
  )
}

export default Login
