import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/home.js';
import Notifications from './components/notifications.js';
import Bookmarks from './components/bookmarks.js';
import Messages from './components/messages.js';
import Profile from './components/profile.js';
import Settings from './components/settings.js';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/bookmarks' element={<Bookmarks/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </div>
  );
}

export default App;
