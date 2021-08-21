import React, { useState, useContext } from 'react'
import { AuthContext } from './context/auth';
import { Button} from "@blueprintjs/core";
import { If, Else, Then } from 'react-if';
import { FormGroup } from 'react-bootstrap';


function Signin() {
  const { loggedIn, logout, login} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")


  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleChange1 = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
  }

  return (
    <div>
      <If condition={loggedIn}>
        <Then>
            <div style={{textAlign:'right'}} >
          <Button intent="danger" onClick={logout}>Logout</Button>
          </div>
        </Then>
        <Else>

              <FormGroup style={{marginLeft:'65%'}}>
          <input
              intent="danger"
              onChange={handleChange}
              name="username"
              required
              type="text"
              placeholder="Enter Username"
            />
            
             <input
              intent="danger"
              onChange={handleChange1}
              name="password"
              required
              type="password"
              placeholder="Enter Password"

            />
            <Button intent="danger" onClick={handleSubmit}>Login</Button>
            </FormGroup>
        </Else>
      </If>
    </div>
  )
}

export default Signin