import React from 'react'
import { Card} from "@blueprintjs/core";
import '../components/todo/todo.css';

function List(props) {


    return (
        <div>   
          {
                <div key={props.idx} >
                    <Card interactive elevation={2} className='card' >
                    {props.item.complete? <span className="span1">Completed</span> :  <span  className="span2">pending</span>}
                  <h3>{props.item.text}</h3>
                  <p><small>Assigned to: {props.item.assignee}</small></p>
                  <p><small>Difficulty: {props.item.difficulty}</small></p>
                  <div onClick={() => props.toggleComplete(props.idx)}>Complete: {props.item.complete.toString()}</div>
                  <button id='btn' onClick={() => props.deleteItem(props.idx)} className='danger'>X</button>
              </Card>
            </div>
          }  
        </div>
    )
}

export default List