
import React from 'react';
import { FormGroup, InputGroup, Elevation, Button, Card} from "@blueprintjs/core";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import './todo.css';
import List from '../todo/List'

const ToDo = (props) => {
  return (
    <>
      <div className="app">

        <Card interactive={true} elevation={Elevation.TWO}>
          <header>
            <h1>To Do List: {props.incomplete} items pending</h1>
          </header>

          <h2>Add To Do Item</h2>

          <form onSubmit={props.handleSubmit} >
            <FormGroup
              label="To Do Item"
            >
              < InputGroup onChange={props.handleChange} placeholder="Item Details" name="text" type="text" intent="success" round="true"/>
            </FormGroup >

            <FormGroup
              label="Assigned To"
            >
              < InputGroup onChange={props.handleChange} placeholder="Assignee Name" name="assignee" type="text" intent="warning" round="true"/>
            </FormGroup >
            <FormGroup
              label="Difficulty" >
              < InputGroup onChange={props.handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" intent="danger" round="true"/>
            </FormGroup >

            <Button text="Add Item" className="bp3-intent-primary" type="submit"/>
          </form>
        </Card>
        </div>
<List 
   list={props.list}
   toggleComplete={props.toggleComplete}
   deleteItem={props.deleteItem}
/>
    </>
  );
};

export default ToDo;
