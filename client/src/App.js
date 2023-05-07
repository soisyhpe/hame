import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/home.js';
import Notifications from './components/notifications.js';
import Bookmarks from './components/bookmarks.js';
import Messages from './components/messages.js';
import Profile from './components/profile.js';
import Settings from './components/settings.js';
import Search from './components/search.js';
import Signin from './components/signin_form.js';
import Signup from './components/signup_form.js';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/bookmarks' element={<Bookmarks/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/search/' element={<Search/>}/>
      </Routes>
    </div>
  );
}

export default App;
