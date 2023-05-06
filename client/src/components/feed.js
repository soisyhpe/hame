import React from 'react';
import axios from 'axios';

import '../assets/css/feed.css';
import tom_anderson from '../assets/medias/tom_anderson.jpg';
import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import save_icon from '../assets/medias/bookmarks.svg';

import { useEffect, useState } from 'react';

const Feed = () => {
  const [messages, setMessages] = useState([]);

  const sendNewMessage = (message) => {
    // todo : post new message and get message_id
    // setMessages( prevValues => { return { ...prevValues, [response.message.message_id]: response.message } });
  }

  const fetchProfilePicture = (userId) => {

  };

  const fetchUsername = (userId) => {
    return "eroschn"
  };

  const fetchMessages = () => {
    fetch('http://localhost:8000/v1/messages/')
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        setMessages(data);
      })
  };
  
  const commentMessage = () => {

  };

  const likeMessage = () => {

  };

  const repostMessage = () => {

  };

  const saveMessage = () => {

  };

  useEffect(() => {
    fetchMessages()
  }, []);

  return (
    <div className='feed'>
      <div className='feed-content'>
        <h1>Fil d'actualité</h1>
        <div className='feed-header'>
          <img className='feed-header-icon' src={tom_anderson} alt='Profile of @eroschn'></img>
          <form className='feed-header-newmessage' onSubmit={sendNewMessage}>

            <div className='feed-header-newmessage-text'>
              <textarea className='feed-header-newmessage-textarea'/>
            </div>

            <div className='feed-header-newmessage-footer'>
              <select>
                <option>Tout le monde</option>
                <option>Cercle</option>
              </select>
              <button form='new-message' className='feed-header-button' type='submit'>Envoyer</button>
            </div>
          </form>
        </div>
        <section className='feed-messages'>

          {messages.length > 0 && messages.map(message => {

            return (<div className='feed-message' id={`${message.message_id}`}>
              <div className='feed-message-header'>
                <img src={tom_anderson} className='feed-message-picture' alt={`Profile of ${message.user_id}`}></img>
                <a href={`./${message.user_id}`}>{fetchUsername(`${message.user_id}`)}</a>
              </div>
              <div className='feed-message-content'>
                <p>{`${message.text}`}</p>

                <p>{`${message.creation_date}`}</p>

                <div className='feed-message-footer'>
                  <div className='feed-message-action' onClick={commentMessage}>
                    <img className='action-icon' src={comment_icon}/>
                    <p>{`${message.reply_count} answers`}</p>
                  </div>
                  <div className='feed-message-action' onClick={repostMessage}>
                    <img className='action-icon' src={repost_icon}/>
                    <p>{`${message.repost_count} reposts`}</p>
                  </div>
                  <div className='feed-message-action' onClick={likeMessage}>
                    <img className='action-icon' src={like_icon}/>
                    <p>{`${message.like_count} likes`}</p>
                  </div>
                  <div className='feed-message-action' onClick={saveMessage}>
                    <img className='action-icon' src={save_icon}/>
                  </div>
                </div>
              </div>
            </div>)

          })}

        </section>
      </div>
    </div>
  );
}

export default Feed;