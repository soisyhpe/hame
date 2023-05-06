import * as React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/navbar.css';
import logo from '../assets/medias/hame_logo.svg';
import home_icon from '../assets/medias/home.svg';
import notifications_icon from '../assets/medias/notifications.svg';
import bookmarks_icon from '../assets/medias/bookmarks.svg';
import messages_icon from '../assets/medias/messages.svg';
import user_icon from '../assets/medias/user.svg';
import settings_icon from '../assets/medias/settings.svg';
import tom_anderson from '../assets/medias/tom_anderson.jpg';

function navbar() {
  return (
    <div id='navbar'>
      <div id='navbar-content'>
        <section id='navbar-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
        </section>

        <section id='navbar-section'>
          <div id='navbar-items'>
            <div id='navbar-item'>
              <img src={home_icon} className='navbar-item-icon' alt='House icon'></img>
              <Link to='./home'>Accueil</Link>
            </div>
            <div id='navbar-item'>
              <img src={notifications_icon} className='navbar-item-icon' alt='Ring-bell icon'></img>
              <Link to='./notifications'>Notifications</Link>
            </div>
            <div id='navbar-item'>
              <img src={bookmarks_icon} className='navbar-item-icon' alt='Bookmark icon'></img>
              <Link to='./bookmarks'>Bookmarks</Link>
            </div>
            <div id='navbar-item'>
              <img src={messages_icon} className='navbar-item-icon' alt='Opened letter icon'></img>
              <Link to='./private-messages'>Messages</Link>
            </div>
          </div>
        </section>
        
        <section id='navbar-section'>
          <div id='navbar-items'>
            <div id='navbar-item'>
              <img src={user_icon} className='navbar-profile' alt='User icon'></img>
              <Link to='./profile'>Profile</Link>
            </div>
            <div id='navbar-item'>
              <img src={settings_icon} className='navbar-item-icon' alt='Settings icon'></img>
              <Link to='./settings'>Paramètres</Link>
            </div>
          </div>
        </section>

        <section id='navbar-footer'>
          <div id='navbar-footer-links'>
            <a href='#cgu'>Conditions d'utilisation</a>
            <a href="#personnal-data">Données personnelles</a>
          </div>
          <div id='navbar-footer-copyright'>© 2023 Hame</div>
        </section>
      </div>
    </div>
  );
}

export default navbar;