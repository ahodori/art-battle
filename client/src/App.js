import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './Header';
import BattleList from './BattleList';
import BattlePage from './BattlePage';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return;
  }, [])

  function handleLogin(e) {
    e.preventDefault();
    console.log(e);

    fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value
      })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        console.log(json);
      })
    }

  function handleLogout(e) {

  }

  function handleSignup(e) {

  }

  return (
  <BrowserRouter>
      <div className="App">
      <Header currentUser={currentUser}
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleSignup={handleSignup}/>
      <Routes>
        <Route path="/" element={<BattleList/>}/>
        {/* <Route path="/user">
          <Route path=":id" element={<UserProfile/>}/>
        </Route> */}
        <Route path="/battle">
          <Route path=":id" element={<BattlePage/>}/>
        </Route>
      </Routes>
    </div>
  </BrowserRouter>

  );
}

export default App;
