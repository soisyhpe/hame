import './assets/css/feed.css'

function feed() {
  return (
    <div id='feed'>
      <div id='feed-content'>
        <div id='feed-header'>
          <img src='' alt='Picture profile of @eroschn'></img>
          <form className='feed-header-newmessage'>
            <textarea className='feed-header-newmessage-textarea'/>
            <select>
              <option>Tout le monde</option>
              <option>Cercle</option>
            </select>
            <button className='feed-header-button' type='submit'>Envoyer</button>
          </form>
        </div>
        <div id='feed-items'>
          <div id='feed-item'>
            <div className='feed-item-header'>
              <img src='' className='feed-item-header-picture' alt='Picture profile of @eroschn'></img>
              <p>Eros Chan</p>
              <a href='#'>@eroschn</a>
            </div>
            <div className='feed-item-content'>
              Ceci est un message.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default feed;