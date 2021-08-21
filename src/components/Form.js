import React , { useContext}  from 'react'
import { Button, Card, Elevation, FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import { AuthContext } from '../components/context/auth';

function Form(props) {
  const { user} = useContext(AuthContext);
  return (
    <>
    {user.type === 'admin' &&
        <div className="app">
          <Card interactive={true} elevation={Elevation.TWO}>
            <h2>Add To Do Item</h2>

            <form onSubmit={props.handleSubmit} >
              <FormGroup
                label="To Do Item"
              >
                < InputGroup onChange={props.handleChange} placeholder="Item Details" name="text" type="text" intent="success" round="true" />
              </FormGroup >

              <FormGroup
                label="Assigned To"
              >
                < InputGroup onChange={props.handleChange} placeholder="Assignee Name" name="assignee" type="text" intent="warning" round="true" />
              </FormGroup >
              <FormGroup
                label="Difficulty" >
                < InputGroup onChange={props.handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" intent="danger" round="true" />
              </FormGroup >
              <label>
                <span>Items Per Page</span>
                <input onChange={props.handlePaginationChange} defaultValue={3} type="range" min={1} max={5} name="items-per-page" />
              </label>
              <br></br>
              <label>
                <Switch onChange={props.handleHide}>
                  Hide Completed
                </Switch>
              </label>
              <br></br>
              <Button text="Add Item" className="bp3-intent-primary" type="submit" />
            </form>
          </Card>
        </div>
    }
      </>
  )
}

export default Form
