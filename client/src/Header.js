import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Button, Alert, Nav } from "react-bootstrap";

function Header({currentUser,
                 loggedIn,
                 handleLogout,
                 handleLogin,
                 handleSignup,
                 loginErrorText}) {
    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand><Link to="/">thee ultimate art battle</Link></Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
        {loggedIn ?
            (<Nav>
                <Nav.Item><Nav.Link>Welcome, {currentUser?.username}</Nav.Link></Nav.Item>
                <Nav.Item><Button onClick={handleLogout}>Log out</Button></Nav.Item>                
                {loginErrorText && <Alert variant="danger">{loginErrorText}</Alert>}
            </Nav>)
        :
            (<Nav>
                <Nav.Item><Nav.Link onClick={() => {setShowLogin(current => !current); setShowSignup(false)}}>Log in</Nav.Link></Nav.Item>
                {showLogin && <form onSubmit={handleLogin}>
                    <label>Username:<input type="text" name="username"/></label>                    
                    <label>Password:<input type="password" name="password"/></label>
                    <input type="submit" value="Log in"/>
                </form>}
                <Nav.Item><Nav.Link onClick={() => {setShowSignup(current => !current); setShowLogin(false)}}>Sign up</Nav.Link></Nav.Item>
                
            </Nav>)
        }
        </Navbar.Collapse>
        </Container>        
    </Navbar>
    {loginErrorText && <Alert variant="danger">{loginErrorText}</Alert>}
    </>
    );
}

export default Header;