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
  const [loginErrorText, setLoginErrorText] = useState("");

  //TODO: autoset current user if cookie exists
  // useEffect(() => {
  //   return;
  // }, [])

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
        if (json.error) {
          console.error("Error:", json.error);
          setLoginErrorText(json.error);          
        } else {
          console.log(json);
          setCurrentUser(json);
          setLoggedIn(true);
          setLoginErrorText("");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setLoginErrorText(error);
      });
    }

  function handleLogout(e) {
    e.preventDefault();

    fetch("/logout",{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }})
    .then(res => {
      setCurrentUser({});
      setLoggedIn(false);
    })
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
              handleSignup={handleSignup}
              loginErrorText={loginErrorText}/>
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
