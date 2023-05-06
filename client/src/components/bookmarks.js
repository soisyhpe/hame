import React, { useState, useEffect } from 'react';

import '../assets/css/bookmarks.css';
import '../assets/css/feed.css';
import tom_anderson from '../assets/medias/tom_anderson.jpg';
import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import save_icon from '../assets/medias/bookmarks.svg';


import Navbar from './navbar';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchProfilePicture = (userId) => {

  };

  const fetchUsername = (userId) => {
    return "eroschn"
  };

  const fetchBookmarks = () => {
    fetch('http://localhost:8000/v1/bookmarks/', { user_id: 'b9bb829a-d3f7-4a0b-b58e-9af7611a79f9' })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setBookmarks(data);
      })
  }

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="bookmarks">
      <Navbar/>

      <div className='feed'>
        <div className='feed-content'>
          <h1>Bookmarks</h1>
          <section id='feed-messages'>

            {bookmarks.length > 0 && bookmarks.map(bookmark => {

              return (
                <div className='feed-message' id={`${bookmark.message_id}`}>
                  <div className='feed-message-header'>
                    <img src={tom_anderson} className='feed-message-picture' alt={`Profile of ${bookmark.user_id}`}></img>
                    <a href={`./${bookmark.user_id}`}>{fetchUsername(`${bookmark.user_id}`)}</a>
                  </div>
                  <div className='feed-message-content'>
                    <p>{`${bookmark.text}`}</p>

                    <p>{`${bookmark.creation_date}`}</p>

                    <div className='feed-message-footer'>
                      <div className='feed-message-action'>
                        <img className='action-icon' src={comment_icon}/>
                        <p>{`${bookmark.reply_count} answers`}</p>
                      </div>
                      <div className='feed-message-action'>
                        <img className='action-icon' src={repost_icon}/>
                        <p>{`${bookmark.repost_count} reposts`}</p>
                      </div>
                      <div className='feed-message-action'>
                        <img className='action-icon' src={like_icon}/>
                        <p>{`${bookmark.like_count} likes`}</p>
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
    </div>
  )
};

export default Bookmarks;