import React from 'react';

import '../assets/css/search.css';
import '../assets/css/feed.css';
import '../assets/css/navbar.css';

import Navbar from './navbar.js';
import tom_anderson from '../assets/medias/tom_anderson.jpg';
import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import save_icon from '../assets/medias/bookmarks.svg';


const Search = () => {
  const [messages, setMessages] = React.useState([]);

  const fetchMessages = () => {
    fetch('http://localhost:8000/v1/messages/', { text: 'hey' })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMessages(data);
      })
  }

  React.useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div id='feed'>
      <Navbar/>
      <div id='feed-content'>
        <h1>Search for "test"</h1>
        <div id='feed-messages'> 
          {messages.length > 0 && messages.map(message => {

            return (
              <div className='feed-message' id={`${message.message_id}`}>
                <div className='feed-message-header'>
                  <img src={tom_anderson} className='search-message-picture' alt={`Profile of ${message.user_id}`}></img>
                  <a href={`./${message.user_id}`}>{message.user_id}</a>
                </div>
                <div className='feed-message-content'>
                  <p>{message.text}</p>

                  <p>{message.creation_date}</p>

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
            )
          })}


          </div>
        </div>
      </div>
  );
}

export default Search;