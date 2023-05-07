import React, { useState, useEffect } from 'react';

import { fetchCountMessagesFromUserId, fetchMessagesFromUserId, fetchUserFromUserId, fetchProfilePictureFromUserId, fetchUserFromUsername,  } from '../tools/message_tools.js';

import '../assets/css/profile.css';
import '../assets/css/feed.css';

import banner from '../assets/medias/bannière.png';
import tom_anderson from '../assets/medias/tom_anderson.jpg';
import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import save_icon from '../assets/medias/bookmarks.svg';

import Navbar from './navbar';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Followers from './followers.js';
import Friends from './friends.js';

const Profile = () => {
  // const userId = 'b9bb829a-d3f7-4a0b-b58e-9af7611a79f9';
  const [userData, setUserData] = useState({});
  const [userMessages, setUserMessages] = useState({});
  const [userId, setUserId] = useState('b9bb829a-d3f7-4a0b-b58e-9af7611a79f9');
  const [showFollowersModal, setShowFollowersModal] = React.useState(false);
  const [showFriendsModal, setShowFriendsModal] = React.useState(false);

  const navigate = useNavigate();

  let { username } = useParams();

  if (username === undefined) {
    username = 'eroschn';
  }


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserFromUsername(`${username}`);
      setUserId(data.user_id);
      setUserData(data);
    }

    const fetchMessages = async () => {
      const messages = await fetchMessagesFromUserId(`${userId}`);
      setUserMessages(messages);
    }

    fetchData();
    fetchMessages();
    console.log(userMessages);
  }, []);

  const toggleFollowersModal = () => {
    setShowFollowersModal(!showFollowersModal);
  };

  const toggleFriendsModal = () => {
    setShowFriendsModal(!showFriendsModal);
  };

  const showBiography = () => {
    return (
      <div className='profile-header-biography'>
      { userData.bio !== null ? <p>{`${userData.bio}`}</p>: ''
      }
      </div>
    );
  }

  const showInformation = () => {
    return (
      <div className='profile-header-information'>
        { userData.website !== null ?
        <div className='profile-header-information-item'>
          <p>Site web : {`${userData.website}`}</p>
        </div> : ''
        }
        { userData.location !== null ?
        <div className='profile-header-information-item'>
          <p>Location : {`${userData.location}`}</p>
        </div> : ''
        }
        { userData.creation_date !== null ?
        <div className='profile-header-information-item'>
          <p>Creation date : {`${userData.creation_date}`}</p>
        </div> : ''
        }
      </div>
    );
  }

  const showStatistics = () => {
    return (
      <div className='profile-header-statistics'>
        <div className='profile-header-statistics-item'>
        <span onClick={toggleFriendsModal} className="profile-item">
            {`${userData.friends}`} friends
          </span>
        </div>
        <div className="profile-header-statistics-item">
          <span onClick={toggleFollowersModal} className="profile-item">
            {`${userData.followers}`} followers
          </span>
        </div>
        <div className='profile-header-statistics-item'>
          <p>{userMessages.length} messages</p>
        </div>
        <div className='profile-header-statistics-item'>
          <p>{userMessages.length} j'aime</p>
        </div>
      </div>
    );
  }

  const showUserMessage = (message) => {
    return (
      <div className='feed-message' id={`${message.message_id}`}>
        <div className='feed-message-header'>
          <img src={tom_anderson} className='feed-message-picture' alt={`Profile of ${message.user_id}`}/>
          <a href={`./${userData.username}`} onClick={(e)=>{e.preventDefault(); navigate(`/${userData.username}`);}}>{userData.username}</a>
        </div>
        <div className='feed-message-content'>
          <p>{`${message.text}`}</p>

          <p>{`${message.creation_date}`}</p>

          <div className='feed-message-footer'>
            <div className='feed-message-action'>
              <img className='action-icon' src={comment_icon}/>
              <p>{`${message.reply_count} answers`}</p>
            </div>
            <div className='feed-message-action'>
              <img className='action-icon' src={repost_icon}/>
              <p>{`${message.repost_count} reposts`}</p>
            </div>
            <div className='feed-message-action'>
              <img className='action-icon' src={like_icon}/>
              <p>{`${message.like_count} likes`}</p>
            </div>
            <div className='feed-message-action'>
              <img className='action-icon' src={save_icon}/>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showUserMessages = () => {
    if (userMessages.length > 0) {
      return (
        userMessages.map(message => showUserMessage(message))
      );
    } else {
      return (
        <div className='feed-message'>
          <div className='feed-message-content'>
            <h3>Pas de messages</h3>
            <p>L'utilisateur n'a pas encore publier de message...</p>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="profile">
      <Navbar/>
      {showFollowersModal && (
          <div className="page-modal">
            <Followers username={userData.username} />
            <button onClick={toggleFollowersModal} className='profile-list-closebutton'>Close</button>
          </div>
      )}
      {showFriendsModal && (
          <div className="page-modal">
            <Friends username={userData.username} />
            <button onClick={toggleFriendsModal} className='profile-list-closebutton'>Close</button>
          </div>
      )}
      <div className='profile-page'>
        <div className='profile-content'>
          <h1>Profile de {`${userData.username}`}</h1>
          <div className='profile-header'>
            <div className='profile-header-picture'>
              <img src={tom_anderson}/>
              <div className='profile-header-action'>
                <button className='profile-button'>Suivre</button>
                <button className='profile-button block'>Bloquer</button>
              </div>
            </div>
            <div className='profile-header-username'>
              <h2>{`${userData.firstname} ${userData.lastname}`}</h2>
              <h3>{`@${userData.username}`}</h3>
            </div>
            {showBiography()}
            {showInformation()}
            {showStatistics()}
          </div>
          <div className='profile-messages'>
            {showUserMessages()}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;