import React from 'react';
import SettingsProvider from './components/context/Settings';
import ToDo from './components/todo/todo';
import ContextAuth from './components/context/auth';
import Auth from './components/Auth';
import Navbar from './components/Navbar';


function App() {

  return (
    <div>
      <ContextAuth>
        <Navbar />
        <Auth capability="read">
          <SettingsProvider>
            <ToDo />
          </SettingsProvider>
        </Auth>
      </ContextAuth>
    </div>
  )
}

export default App;
