import React, { useState, useEffect } from 'react';
// import SettingContextProvider from './components/todo/context/context';
// import FormBlue from './components/todo/FormBlue.js';
import ToDo from './components/todo/todo.js';
import Pagination from './components/todo/context/context'
import useForm from '../src/hooks/form.js';
import { v4 as uuid } from 'uuid';
// import ListContextProvider from './components/todo/context/context';


function App() {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [currentPage, setCurrentPage] = useState(1)
  const [listPerPage] = useState(3)


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


  // get current cards
  const indexOfLastCard = currentPage * listPerPage;
  const indexOfFirstCard = indexOfLastCard - listPerPage;
  const currentCard = list.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div>
      <ToDo
        incomplete={incomplete}
        handleChange={handleChange}
        handleSubmit={handleSubmit}

        list={currentCard}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      />
      <br></br>
      <Pagination
        listPerPage={listPerPage}
        totalCards={list.length}
        paginate={paginate}
      />
      <br></br>
      <br></br>

    </div>
  )
}

export default App;
