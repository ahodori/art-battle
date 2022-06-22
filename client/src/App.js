import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './Header';
import BattleList from './BattleList';
import BattlePage from './BattlePage';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    return;
  }, [])



  return (
  <BrowserRouter>
      <div className="App">
      <Header/>
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
