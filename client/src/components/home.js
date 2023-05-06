import React from 'react';

import '../assets/css/home.css';
import Navbar from './navbar';
import Feed from './feed';
import Searchbar from './searchbar';

const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <Feed/>
      <Searchbar/>
    </div>
  )
};

export default Home;