import React from 'react';
import SettingsProvider from './components/context/Settings';
import ToDo from './components/todo/todo';

function App() {

  return (
    <div>
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
    </div>
  )
}

export default App;
