import React from 'react';

import '../assets/css/search.css';
import '../assets/css/feed.css';
import '../assets/css/navbar.css';
import '../assets/css/home.css';
import '../assets/css/searchbar.css';


import Navbar from './navbar.js';
import SearchBar from './searchbar.js';
import { fetchUsernameFromUserId } from '../tools/message_tools';
import tom_anderson from '../assets/medias/tom_anderson.jpg';
import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import save_icon from '../assets/medias/bookmarks.svg';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Search = () => {
  
  const [messages, setMessages] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [usernames, setUsernames] = React.useState({});

  const navigate = useNavigate();

  
  let keywords=searchParams.get("keywords");

  const fetchMessages = () => {
    console.log(keywords);
    fetch('http://localhost:8000/v1/messages/?text=' + keywords)
      .then((response) => {
        return response.json()
      })    
      .then((data) => {
        setMessages(data);
      })
  }

  const convertFromUserIdToUsername = async (userId) => {
    const response=await fetchUsernameFromUserId(userId);
    return response[0].username;
  }

  React.useEffect(() => {

    fetchMessages();
    document.getElementById('search-title').innerHTML = `Search for "${keywords}"`;
  
  }, [keywords]);

  React.useEffect(() => {
    const fetchUsernames = async () => {
      const newUsernames = {};
      for (const message of messages) {
        if (!newUsernames[message.user_id]) {
          newUsernames[message.user_id] = await fetchUsernameFromUserId(message.user_id);
        }
      }
      setUsernames(newUsernames);
    }
    
    fetchUsernames();
  }, [messages]);


  return (
    <div className='home'>
      <Navbar/>

    <div className='feed'>
      <div className='feed-content'>
        <h1 id="search-title"></h1>
        <section className='feed-messages'> 
          {messages.length > 0 &&  messages.map( (message) => {

            return (
              <div className='feed-message' id={`${message.message_id}`}>
                <div className='feed-message-header'>
                  <img src={tom_anderson} className='feed-message-picture' alt={`Profile of ${message.user_id}`}></img>
                  <a href={`./${message.user_id}`} className='feed-message-username' onClick={(e)=>{e.preventDefault(); navigate(`/${message.user_id}`);}} >{usernames[message.user_id]}</a>
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


          </section>
        </div>
      </div>
      <SearchBar/>
      </div>
      
  );
}

export default Search;