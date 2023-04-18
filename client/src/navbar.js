import './assets/css/navbar.css';
import logo from './assets/medias/hame_logo.svg';
import home_icon from './assets/medias/home.png';
import notifications_icon from './assets/medias/notifications.png';
import bookmarks_icon from './assets/medias/bookmarks.png';
import messages_icon from './assets/medias/messages.png';
import settings_icon from './assets/medias/settings.png';
import tom_anderson from './assets/medias/tom_anderson.jpg';

function navbar() {
  return (
    <div id='navbar'>
      <div id='navbar-content'>
        <div id='navbar-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
        </div>
        <div id='navbar-sections'>

          <div id='navbar-section'>
            <div id='navbar-items'>
              <div id='navbar-item'>
                <img src={home_icon} className='navbar-item-icon' alt='House icon'></img>
                <a href='./home'>Accueil</a>
              </div>
              <div id='navbar-item'>
                <img src={notifications_icon} className='navbar-item-icon' alt='Ring-bell icon'></img>
                <a href='./notifications'>Notifications</a>
              </div>
              <div id='navbar-item'>
                <img src={bookmarks_icon} className='navbar-item-icon' alt='Bookmark icon'></img>
                <a href='./bookmarks'>Bookmarks</a>
              </div>
              <div id='navbar-item'>
                <img src={messages_icon} className='navbar-item-icon' alt='Opened letter icon'></img>
                <a href='./private-messages'>Messages</a>
              </div>
            </div>
          </div>
          
          <div id='navbar-section'>
            <div id='navbar-items'>
              <div id='navbar-item'>
                <img src={tom_anderson} className='navbar-profile' alt='User icon'></img>
                <a href='./profile'>Profile</a>
              </div>
              <div id='navbar-item'>
                <img src={settings_icon} className='navbar-item-icon' alt='Settings icon'></img>
                <a href='./settings'>Paramètres</a>
              </div>
            </div>
          </div>
        </div>
        <div id='navbar-footer'>
          <div id='navbar-footer-links'>
            <a href='#cgu'>Conditions d'utilisation</a>
            <a href="#personnal-data">Données personnelles</a>
          </div>
          <div id='navbar-footer-copyright'>© 2023 Hame</div>
        </div>
      </div>
    </div>
  );
}

export default navbar;