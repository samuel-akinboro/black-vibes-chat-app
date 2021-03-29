import './App.css';
import Chat from './components/Chat';
import IconSidebar from './components/IconSidebar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './state-management/StateProvider'
import Login from './components/Login.jsx'

function App() {
  const [{ user }, dispatch] = useStateValue();
  const ChatPage = () => (
    <>
      <IconSidebar />
      <Sidebar />
    </>
  )

  return (
    <div className="app">
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
