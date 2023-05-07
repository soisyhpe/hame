import React from 'react';

import '../assets/css/searchbar.css';
import logo from '../assets/medias/hame_logo.svg';
import home_icon from '../assets/medias/home.svg';
import search_icon from '../assets/medias/search.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function searchbar() {

  const search = (event) => {
    // search a message by text by calling the api and redirect to result page
    // todo : get the message_id
    // todo : redirect to the message page
    event.preventDefault();

    axios.get('http://localhost:8000/v1/messages/', {
      params: {
        text: event.target[0].value
      }
      , headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        // todo : redirect to the message page and show messages
        // redirect to the result page
        window.location.href = '/search';
      })
      .catch((error) => {
        console.log(error);
      })

  }


  return (
    <div id='searchbar'>
      <div id='searchbar-content'>
        <section id='searchbar-header'>
          <h3>Rechercher</h3>
          <Link to='/search'>
          <form id='searchbar-item' onSubmit={search} >
            <input className='searchbar-input' type='text' placeholder='Recherche'/>
          </form>
          </Link>

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