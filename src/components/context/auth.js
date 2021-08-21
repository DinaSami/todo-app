import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
const API = 'https://auth-server-401.herokuapp.com';
export const AuthContext = React.createContext();

function ContextAuth(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  let setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user);
    setLoggedIn(loggedIn);
  };

  let login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);

      validateToken(response.body.token);
    } catch (error) {
        window.alert('make sure to signup first!')
    }
  };

  let logout = () => {
    setLoginState(false, null, {});
  };
  let validateToken = (token) => {
    if (token !== 'null') {
      const user = jwt.decode(token);
      setLoginState(true, token, user);
    } else {
      setLoginState(false, null, {});
    }
  };
  const signup = async (username, password, role) => {
    try {
      const response = await superagent
        .post(`${API}/signup`, { username, password, role });
      validateToken(response.body.token);
    } catch (e) {
        window.alert('You already have an account please signIn')

    }
  };
  

  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState, signup }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}

export default ContextAuth