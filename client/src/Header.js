import { useState } from "react";

function Header({currentUser,
                 loggedIn,
                 handleLogout,
                 handleLogin,
                 handleSignup,
                 loginErrorText}) {
    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)


    return (<div>
        thee ultimate art battle
        {loggedIn ?
            (<div>
                <p>{currentUser?.name}</p>
                <p onClick={handleLogout}>Log out</p>
                {loginErrorText && <p>{loginErrorText}</p>}
            </div>)
        :
            (<div>
                <p onClick={() => {setShowLogin(current => !current); setShowSignup(false)}}>Log in</p>
                <p onClick={() => {setShowSignup(current => !current); setShowLogin(false)}}>Sign up</p>
                {showLogin && <form onSubmit={handleLogin}>
                    <label>Username:<input type="text" name="username"/></label>                    
                    <label>Password:<input type="text" name="password"/></label>
                    <input type="submit" value="Log in"/>
                </form>}
                {loginErrorText && <p>{loginErrorText}</p>}
            </div>)
        }
    </div>);
}

export default Header;