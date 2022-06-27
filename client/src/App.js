import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Header from './Header';
import BattleList from './BattleList';
import BattlePage from './BattlePage';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBattleFormOpen, setIsBattleFormOpen] = useState(false);
  const [battleErrorText, setBattleErrorText] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");

  //TODO: autoset current user if cookie exists
  useEffect(() => {
    fetch("/me")
    .then(res => {
      console.log(res);
      if (res.ok) {
        res.json().then((json) => {
          console.log(json);
          setCurrentUser(json);
          setLoggedIn(true);
        });
      }
    })
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

        if (res.ok) {
          res.json().then((json) => {
            console.log(json);
            setCurrentUser(json);
            setLoggedIn(true);
            setLoginErrorText("");
          })
        } else {
          res.json().then((json) => {
            console.error("Error:", json.error);
            setLoginErrorText(json.error);   
          })
        }
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

  function handleNewBattle(e) {
    e.preventDefault();

    fetch("/battles", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target[0].value,
        prompt: e.target[1].value
      })
    })
    .then(res => {
      console.log(res)
      if (res.ok) {
        res.json().then((json) => {
          console.log(json);
          setBattleErrorText("");
          window.location.reload(true);
        })
      } else {
        res.json().then((json) => {
          console.log(json);
          setBattleErrorText(json.error);
        })
      }
    })
  }

  return (
  <BrowserRouter>
      <div className="App">
        <div className="just-background"></div>
      <Header currentUser={currentUser}
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleSignup={handleSignup}
              loginErrorText={loginErrorText}/>
      <br/>
      <Container>
        <Row className="justify-content-md-center gx-5">
          <Col></Col>
          <Col xs={6}>
          <Routes>
            <Route path="/" element={<BattleList/>}/>
            {/* <Route path="/user">
              <Route path=":id" element={<UserProfile/>}/>
            </Route> */}
            <Route path="/battle">
              <Route path=":id" element={<BattlePage currentUser={currentUser}
                                                    loggedIn={loggedIn}/>}/>
            </Route>
          </Routes>
          </Col>
          <Col>{loggedIn && currentUser.is_admin && <Card>
              <Card.Title>Admin Panel</Card.Title>
              <Button onClick={() => setIsBattleFormOpen((current) => !current)}>Start New Battle</Button>
              {isBattleFormOpen && <Card.Text>
                <Form onSubmit={handleNewBattle}>
                    <Form.Group>
                      <Form.Label>Battle name:</Form.Label>
                      <Form.Control type="text" name="name"/>         
                      <Form.Label>Batttle prompt:</Form.Label>
                      <Form.Control type="text" name="prompt"/>
                      <Button type="submit">Create battle</Button>
                    </Form.Group>
                </Form>
                {battleErrorText && <Alert variant="danger">{battleErrorText}</Alert>}
                </Card.Text>}
            </Card>}</Col>
        </Row>
      </Container>


    </div>
  </BrowserRouter>

  );
}

export default App;
