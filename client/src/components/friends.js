import React from 'react';

const Friends = ({ username }) => {
  const [friends, setFriends] = React.useState([]);

  const fetchFriends = async () => {
    const response = await fetch(`http://localhost:8000/v1/friends/${username}`);
    const data = await response.json();
    console.log(data);
    setFriends(data);
  };

  React.useEffect(() => {
    fetchFriends();
  }, [username]);

  return (
    <div className='friends'>
      <h2>Friends</h2>
      <ul>
        {Array.isArray(friends) ? (
          friends.map((friend) => (
            <li key={friend.friend_id}>
              <a href={`./${friend.friend_id}`}>{friend.friend_id}</a>
            </li>
          ))
        ) : (
          <p>No friend found.</p>
        )}
      </ul>
    </div>
  );
};

export default Friends;
