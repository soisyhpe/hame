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
    
    // posting new message
      axios.post('http://localhost:8000/v1/messages/b9bb829a-d3f7-4a0b-b58e-9af7611a79f9', {
      text: message.target[0].value,
      user_id: "b9bb829a-d3f7-4a0b-b58e-9af7611a79f9",
      reply_count: 0,
      repost_count: 0,
      like_count: 0,
      scope : "default",
      source : "web",
      creation_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        // updating state
        console.log(response.data.message);
        console.log(messages);

        setMessages( prevValues => { return [ ...prevValues, response.data.content ] });
        console.log("message posted");
      }
    )
      .catch((error) => {
        console.log(error);
      }
    )
    message.target[0].value = '';
    message.preventDefault();
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

  // change textarea height according to content
  const changetextarea = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 10 + 'px';
  }

  return (
    <div className='feed'>
      <div className='feed-content'>
        <h1>Fil d'actualité</h1>  
        <div className='feed-header'>
          <img className='feed-header-icon' src={tom_anderson} alt='Profile of @eroschn'></img>
          <form className='feed-header-newmessage' onSubmit={sendNewMessage}>

            <div className='feed-header-newmessage-text'>
              <textarea placeholder='Écrire un message...' className='feed-header-newmessage-textarea' onChange={changetextarea}/>
            </div>

            <div className='feed-header-newmessage-footer'>
              <select className='feed-header-newmessage-rangeselect'>
                <option>Tout le monde</option>
                <option>Cercle</option>
              </select>
              <button className='feed-header-button' type='submit'>Envoyer</button>
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