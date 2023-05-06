import React from 'react';

import '../assets/css/searchbar.css';
import logo from '../assets/medias/hame_logo.svg';
import home_icon from '../assets/medias/home.svg';
import search_icon from '../assets/medias/search.svg';

function searchbar() {
  return (
    <div id='searchbar'>
      <div id='searchbar-content'>
        <section id='searchbar-header'>
          <h3>Rechercher</h3>
          <form id='searchbar-item'>
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

export default searchbar;