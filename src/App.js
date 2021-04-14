import './App.css';
import Chat from './components/Chat';
import IconSidebar from './components/IconSidebar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './state-management/StateProvider'
import Login from './components/Login.jsx'
<<<<<<< HEAD

function App() {
  const [{ user }, dispatch] = useStateValue();
=======
import backgroundImage from './images/bg.jpg'

function App() {
  const [{ user }] = useStateValue();
  const backgroundImageUrl = `url(${backgroundImage})`;
>>>>>>> 54c1294 (glassmorphism)
  const ChatPage = () => (
    <>
      <IconSidebar />
      <Sidebar />
    </>
  )

  return (
<<<<<<< HEAD
    <div className="app">
=======
    <div className="app" style={{backgroundImage: backgroundImageUrl, backgroundSize: "cover"}}>
>>>>>>> 54c1294 (glassmorphism)
      <div className="app__container">
        <Router>
          <Switch>
            <Route path="/group/:roomId">
              <ChatPage />
              <Chat type="room"/>
            </Route>
            <Route path="/message/:roomId">
              <ChatPage />
              <Chat type="message"/>
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
