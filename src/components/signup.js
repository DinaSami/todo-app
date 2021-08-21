import React, { useContext, useState } from 'react';
import { AuthContext } from './context/auth';
import { FormGroup, InputGroup, Button,  Label ,Card} from "@blueprintjs/core";

function Signup(props) {

  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else {
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password, role);
  };

  return (
   <>

      <h1 id="contained-modal-title-vcenter">Signup</h1>

      <Card style={{width:'23rem',margin:'auto'}}>
        <FormGroup intent="danger">
          <FormGroup controlId="formBasicUsername">
            <label>Username</label>
            <InputGroup
              intent="danger"
              onChange={handleChange}
              name="username"
              required
              type="text"
              placeholder="Enter username"
            />
          </FormGroup  >
          <FormGroup controlId="formBasicPassword" intent="danger">
            <Label intent="danger">Password</Label>
            <InputGroup
              intent="danger"
              onChange={handleChange}
              name="password"
              required
              type="password"
              placeholder="Password"
            />
          </FormGroup>

          <FormGroup intent="danger">
            <Label intent="danger">Role</Label>
            <select onChange={handleChange} name="role" as="select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </FormGroup>
        </FormGroup>

        <Button intent="success" onClick={handleSubmit}>
          Signup
        </Button>
        </Card>
    </>
  );
}

export default Signup;