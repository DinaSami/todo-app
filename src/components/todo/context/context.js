// import React, { useState } from 'react';

// export const SettingsContext = React.createContext();

// export default function SettingsProvider(props) {
//   const [hide, setHide] = useState(false);
//   const [itemNumber, setItemNumber] = useState(3);
//   const [sort, setSort] = useState(''); // create default sort here! Pass in 'difficulty' instead of a blank string, for example

//   return (
//     <SettingsContext.Provider value={{ hide, itemNumber, sort, setItemNumber, setHide }}>
//       {props.children}
//     </SettingsContext.Provider>
//   )
// }