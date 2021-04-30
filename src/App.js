import './App.css';
import Chat from './components/Chat';
import IconSidebar from './components/IconSidebar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './state-management/StateProvider'
import Login from './components/Login.jsx'
import backgroundImage from './images/bg.jpg'

function App() {
  const [{ user }] = useStateValue();
  const backgroundImageUrl = `url(${backgroundImage})`;
  const ChatPage = () => (
    <>
      <IconSidebar />
      <Sidebar />
    </>
  )

  return (

    <div className="app" style={{backgroundImage: backgroundImageUrl, backgroundSize: "cover"}}>
      <div className="app__container">
        <Router>
          <Switch>
            <Route path="/group/:roomId">
              {user != null ? 
                <>
                  <ChatPage />
                  <Chat type="room"/>
                </> : <Login />
              }
            </Route>
            <Route path="/message/:roomId">
              {user != null ? 
                <>
                  <ChatPage />
                  <Chat type="message"/>
                </> : <Login />
              }
            </Route>
            <Route path="/">
              {user ? <ChatPage /> : <Login />}
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
