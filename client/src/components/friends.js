import React from 'react';
import { fetchUserFromUserId } from '../tools/message_tools';
import { useNavigate } from 'react-router-dom';


const Friends = ({ username }) => {
  const [friends, setFriends] = React.useState([]);
  const navigate = useNavigate();

  const fetchFriends = async () => {
    const response = await fetch(`http://localhost:8000/v1/friends/${username}`);
    const data = await response.json();
    console.log(data);

    // get username from user_id
    const newFriends = [];
    for (const friend of data) {
        const user = await fetchUserFromUserId(friend.friend_id);
        newFriends.push({friend_id: user.username});
        }
    setFriends(newFriends);

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
                <a href={`./${friend.friend_id}`} onClick={(e)=>{e.preventDefault(); navigate(`/${friend.friend_id}`);}}>{friend.friend_id}</a>
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
