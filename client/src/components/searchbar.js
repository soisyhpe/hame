import React from 'react';

import '../assets/css/searchbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/medias/hame_logo.svg';
import home_icon from '../assets/medias/home.svg';
import search_icon from '../assets/medias/search.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Searchbar() {
  let navigate = useNavigate();


  const search = (event) => {
    // call Search component with the keywords and avoid refreshing the page
    event.preventDefault();
    if (event.target[0].value === '' || event.target[0].value === undefined){
      return;
    }
    const keywords = event.target[0].value;
    navigate('/search?keywords=' + keywords);

  }


  return (
    <div id='searchbar'>
      <div id='searchbar-content'>
        <section id='searchbar-header'>
          <h3>Rechercher</h3>
          <form id='searchbar-item' onSubmit={search} >
            <input className='searchbar-input' type='text' placeholder='Recherche'/>
          </form>

        </section>

        <section id='searchbar-section'>
          <h3>Statistiques</h3>
        </section>

        <section id='searchbar-footer'>
        </section>
      </div>
    </div>
  );
}

export default Searchbar;