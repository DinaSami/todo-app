
import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { AuthContext } from '../context/auth';
import { Button } from "@blueprintjs/core";
import { v4 as uuid } from 'uuid';
import { hhhh } from '../context/Settings'
import Header from '../Header';
import List from '../List';
import Form from '../Form';
import './todo.css';
import superagent from 'superagent';
import axios from "axios";

const ToDo = (props) => {

  const settings = useContext(hhhh);
  const { loggedIn, user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(settings.itemNumber);
  const { handleChange, handleSubmit } = useForm(addItem);
  // const [defaultRange, setdefaultRange] = useState(settings.itemNumber);
  const API = 'https://api-js401.herokuapp.com/api/v1/todo';
  // const storage;

  async function addItem(item) {
    const data = {
      id: uuid(),
      text: item.text,
      assignee: item.assignee,
      difficulty: item.difficulty,
      complete: false,
    };
    // localStorage.setItem('item', JSON.stringify([...list, data]));
    // setList(JSON.parse(localStorage.getItem('item')));
    try {
      await superagent.post(`${API}`).send(data)

      const getResponse = await superagent.get(`${API}`);
      setList(JSON.parse(getResponse.text).results);
    } catch (error) {
      console.error()
    }
  }


  async function deleteItem(id) {
    if (loggedIn && user.capabilities.includes('delete')) {
      list.map(async e => {
        if (e._id === id) {
          await axios.delete(`${API}/${id}`);
          const data = await axios.get(`${API}`);
          setList(data.data.results);

        }
      })

      // localStorage.setItem('item', JSON.stringify(items))
      // setList(JSON.parse(localStorage.getItem('item')))
    } else {
      window.alert('user can not delete item!');
    }
  }

  async function toggleComplete(id) {
    if (loggedIn && user.capabilities.includes('update')) {

      try {
        list.map(async e => {
          if (e._id === id) {
            let data = {
              'complete': !e.complete
            }
            await axios.put(`${API}/${id}`, data);
            const data1 = await axios.get(`${API}`);
            setList(data1.data.results)
          }

        })
      } catch (error) {
        console.error();
      }
      // localStorage.setItem('item', JSON.stringify(list))
    } else {
      window.alert('user can not update item!');
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);




  useEffect(() => {

    const itemStorage = JSON.parse(localStorage.getItem('item'));
    if (itemStorage) {
      setList(itemStorage);
    }

    (async () => {
      try {

        const getResponse = await superagent.get(`${API}`);
        setList(JSON.parse(getResponse.text).results);
      }
      catch (error) {
        console.error()
      }
    })()

    const newStorage = localStorage.getItem('newStorage')
    if (newStorage) {
      // setdefaultRange((Number(newStorage)));
      settings.setItemNumber(Number(newStorage));
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('setting', (Number(settings.itemNumber)));

    setStartIndex(0);
    setEndIndex(settings.itemNumber);
    const storage = localStorage.getItem('setting');
    localStorage.setItem('newStorage', storage);
  }, [settings.itemNumber]);

  useEffect(() => {
   
    (async () => {
      try {

        const getResponse = await axios.get(`${API}`);
        setList(getResponse.data.results);
      }
      catch (error) {
        console.error()
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  // === === hide completed todo's === === //
  function handleHide() {
    settings.setHide(!settings.hide);
  }


  // === === pagination change === === //
  function handlePaginationChange(e) {
    settings.setItemNumber(e.target.value);
  }


  // === === pagination === === //
  function pagination() {

    let result = list.slice(startIndex, endIndex);
    return result;
  }

  // === === next === === //
  function next() {
    setStartIndex(startIndex + settings.itemNumber);
    setEndIndex(endIndex + settings.itemNumber);
  }

  // === === previous === === //
  function previous() {
    setStartIndex(startIndex - settings.itemNumber);
    setEndIndex(endIndex - settings.itemNumber);
    // window.location.reload();
  }


  return (
    <>
      <Header
        incomplete={incomplete}
      />
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        // defaultRange={defaultRange}
        handlePaginationChange={handlePaginationChange}
        handleHide={handleHide}
      />
      <br></br>
      {
        pagination().map((item, idx) => {

          if (settings.hide === false || item.complete === false) {
            return (
              <List
                item={item}
                idx={idx}
                toggleComplete={toggleComplete}
                deleteItem={deleteItem}
              />
            )
          }
        })
      }
      <Button intent="success" onClick={previous}>Previous</Button>
      <Button intent="success" onClick={next}>Next</Button>

    </>
  );
};

export default ToDo;
