import React, { useContext } from 'react'
import { AuthContext } from './context/auth'
import { If, Else, Then } from 'react-if';
import Signup from './signup';


function Auth(props) {
  const { loggedIn, user} = useContext(AuthContext);

  let render = loggedIn && props.capability ? user?.capabilities.includes(props.capability) : false;
  return (
    <div>
      <If condition={render}>
        <Then>
          <div>{props.children}</div>
        </Then>
        <Else>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>To Do List app</h1>
            <p>please make sure to signup first!</p>
            <Signup />
          </div>
        </Else>
      </If>
    </div>
  )
}

export default Auth