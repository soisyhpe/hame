import React, { useState, useEffect } from 'react';

import { fetchProfilePictureFromUserId, fetchProfilePictureFromUsername, fetchUsernameFromUserId, fetchUsernameFromUsername } from '../tools/message_tools.js';

import '../assets/css/bookmarks.css';
import '../assets/css/feed.css';

import comment_icon from '../assets/medias/comment.svg';
import repost_icon from '../assets/medias/repost.svg';
import like_icon from '../assets/medias/like.svg';
import save_icon from '../assets/medias/bookmarks.svg';

import Navbar from './navbar';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

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

  const showBookmark = (bookmark) => {
    return (
      <div className='feed-message' id={`${bookmark.message_id}`}>
        <div className='feed-message-header'>
          <img src={fetchProfilePictureFromUserId(`${bookmark.user_id}`)} className='feed-message-picture' alt={`Profile of ${bookmark.user_id}`}/>
          <a href={`./${bookmark.user_id}`}>{fetchUsernameFromUserId(`${bookmark.user_id}`)}</a>
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
    );
  };

  const showBookmarks = () => {
    if (bookmarks.length > 0) {
      return (
        bookmarks.map(bookmark => showBookmark(bookmark))
      );
    } else {
      return (
        <div className='feed-message'>
          <div className='feed-message-content'>
            <h3>Collection vide</h3>
            <p>Ajoutez vos messages aux signets pour les retrouver facilement.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bookmarks">
      <Navbar/>

      <div className='feed'>
        <div className='feed-content'>
          <h1>Bookmarks</h1>
          <section id='feed-messages'>

            {showBookmarks()}

          </section>
        </div>
      </div>
    </div>
  )
};

export default Bookmarks;