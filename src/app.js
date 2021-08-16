// import FormBlue from './components/todo/FormBlue.js';
import ToDo from './components/todo/todo.js';
import List from './components/todo/List';
// import SettingsProvider from './components/todo/context/context';
import useForm from '../src/hooks/form.js';
import { v4 as uuid } from 'uuid';
import React, { useState, useEffect } from 'react';
export const ThemeContext = React.createContext();




function App() {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  // const [Display , setDisplay ] = useState(false);
  // const [NumberOfItems , setNumberOfItems] = useState(0)
  // const [DefaultSort  , setDefaultSort] = useState('')
 

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    let items = []
    // eslint-disable-next-line array-callback-return
    list.map((ele, idx) => {
      if (id === idx) {
        return 0
      } else {
        items.push(ele)
      }
    })
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item, idx) => {
      if (idx === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete, list]);

  return (
    <div>
       {/* <SettingsProvider> */}
       <ToDo
        incomplete={incomplete}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
         {/* </SettingsProvider> */}
      <List
        list={list}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
    
 
    </div>
  )
}

export default App;
