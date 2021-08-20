import React, { useState } from 'react';

export const hhhh = React.createContext();

export default function SettingsProvider(props) {
  const [hide, setHide] = useState(false);
  const [itemNumber, setItemNumber] = useState(3);
  const [sort] = useState(''); // create default sort here! Pass in 'difficulty' instead of a blank string, for example

const testStorage =localStorage.getItem('');

  return (
    <hhhh.Provider value={{ hide, itemNumber, sort, setItemNumber, setHide }}>
      {props.children}
    </hhhh.Provider>
  )
}