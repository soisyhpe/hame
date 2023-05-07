import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../assets/css/navbar.css';
import logo from '../assets/medias/hame_logo.svg';
import home_icon from '../assets/medias/home.svg';
import notifications_icon from '../assets/medias/notifications.svg';
import bookmarks_icon from '../assets/medias/bookmarks.svg';
import messages_icon from '../assets/medias/messages.svg';
import user_icon from '../assets/medias/user.svg';
import settings_icon from '../assets/medias/settings.svg';
import tom_anderson from '../assets/medias/tom_anderson.jpg';

const navbar = () => {

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <section className='navbar-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
        </section>

        <section className='navbar-section'>
          <div className='navbar-items'>
            <Link to='/home' className='navbar-item'>
              <img src={home_icon} className='navbar-item-icon' alt='House icon'/>
              <div className=''>Accueil</div>
            </Link>
            <Link to='/notifications' className='navbar-item'>
              <img src={notifications_icon} className='navbar-item-icon' alt='Ring-bell icon'></img>
              <p>Notifications</p>
            </Link>
            <Link to='/bookmarks' className='navbar-item'>
              <img src={bookmarks_icon} className='navbar-item-icon' alt='Bookmark icon'></img>
              <p>Bookmarks</p>
            </Link>
            <Link to='/messages' className='navbar-item'>
              <img src={messages_icon} className='navbar-item-icon' alt='Opened letter icon'></img>
              <p>Messages</p>
            </Link>
          </div>
        </section>
        
        <section className='navbar-section'>
          <div className='navbar-items'>
            <Link to='/profile' className='navbar-item'>
              <img src={user_icon} className='navbar-profile' alt='User icon'></img>
              <p>Profile</p>
            </Link>
            <Link to='/settings' className='navbar-item'>
              <img src={settings_icon} className='navbar-item-icon' alt='Settings icon'></img>
              <p>Paramètres</p>
            </Link>
          </div>
        </section>

        <section className='navbar-footer'>
          <div className='navbar-footer-links'>
            <a href='#cgu'>Conditions d'utilisation</a>
            <a href="#personnal-data">Données personnelles</a>
          </div>
          <div className='navbar-footer-copyright'>© 2023 Hame</div>
        </section>
      </div>
    </div>
  );
}

export default navbar;