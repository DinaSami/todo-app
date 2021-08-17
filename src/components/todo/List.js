import React from 'react'
import { Card} from "@blueprintjs/core";
import './todo.css';

function List(props) {
    return (
        <div>
            
          {
            props.list.map((item,idx) => (
                <div key={idx} >
                    <Card interactive elevation={2} className='card' >
                    {item.complete? <span className="span1">Completed</span> :  <span  className="span2">pending</span>}
                  <h3>{item.text}</h3>
                  <p><small>Assigned to: {item.assignee}</small></p>
                  <p><small>Difficulty: {item.difficulty}</small></p>
                  <div onClick={() => props.toggleComplete(idx)}>Complete: {item.complete.toString()}</div>
                  <button id='btn' onClick={() => props.deleteItem(idx)} className='danger'>X</button>
              </Card>
            </div>
            ))
          }  
        </div>
    )
}

export default List
