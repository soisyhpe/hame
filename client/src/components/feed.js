import React from 'react';
import axios from 'axios';

import '../assets/css/feed.css';
import tom_anderson from '../assets/medias/tom_anderson.jpg';
import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import filled_like_icon from '../assets/medias/like-filled.svg';
import save_icon from '../assets/medias/bookmarks.svg';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

const Feed = () => {
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

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
      scope : message.target[1].value,
      source : "web",
      creation_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        // updating state
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
  // like the message and update state
  const likeMessage = (event) => {
    const userId = "b9bb829a-d3f7-4a0b-b58e-9af7611a79f9";
    const messageId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    // get message_id from event target
    axios.get(`http://localhost:8000/v1/messages/${messageId}/likes/${userId}`, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        // updating state
        const likedbool = response.data.message;
        if (likedbool===true) {
          // unlike message
          axios.delete(`http://localhost:8000/v1/messages/${messageId}/likes`, {
            user_id: "b9bb829a-d3f7-4a0b-b58e-9af7611a79f9"
          }, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
              // updating state
              if (response.data.message ==='Message was successfully unliked') {
                event.target.src = like_icon;
                // decrement directly in state
                // setMessages( prevValues => {
                //   let messages = [...prevValues];
                //   messages.find(message => message.message_id === messageId).like_count -= 1;
                //   return messages;
                // });
                // console.log("message unliked");
              }
    
            }
          )
            .catch((error) => {
              console.log(error);
            }
          )
        } else {
          console.log(messageId);
          // post like
          axios.post(`http://localhost:8000/v1/messages/${messageId}/likes`, {
            user_id: "b9bb829a-d3f7-4a0b-b58e-9af7611a79f9",
            creation_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
          }, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
              // updating state
              if (response.data.message ==='Message was successfully liked') {
                event.target.src = filled_like_icon;
                // increment directly in state
                // setMessages( prevValues => {
                //   let messages = [...prevValues];
                //   messages.find(message => message.message_id === messageId).like_count += 1;
                //   return messages;
                // });
                // console.log("message liked");
              } 
              
            }
          )
            .catch((error) => {
              console.log(error);
            }
          )
        }
        
      }
    )
      .catch((error) => {
        console.log(error);
      }
    )

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
                <option value="default">Tout le monde</option>
                <option value="circle">Cercle</option>
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
                <a href={`./${message.user_id}`} onClick={(e)=>{e.preventDefault(); navigate(`/${message.user_id}`);}}>{fetchUsername(`${message.user_id}`)}</a>
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
                    <input type="image" className='action-icon' src={like_icon} alt='likebutton' />
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