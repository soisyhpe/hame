import React from 'react';
import { fetchUserFromUserId } from '../tools/message_tools';
import { useNavigate } from 'react-router-dom';

const Followers = ({ username }) => {
  const [followers, setFollowers] = React.useState([]);
  const navigate = useNavigate();



  const fetchFollowers = async () => {
    const response = await fetch(`http://localhost:8000/v1/followers/${username}`);
    const data = await response.json();
    console.log(data);
    // get username from user_id
    const newFollowers = [];
    for (const follower of data) {
        const user = await fetchUserFromUserId(follower.follower_id);
        newFollowers.push({followername: user.username});
        }
    setFollowers(newFollowers);
  };

  React.useEffect(() => {
    fetchFollowers();
  }, [username]);

  return (
    <div className='followers'>
      <h2>Followers</h2>
      <ul>
        {Array.isArray(followers) ? (
          followers.map((follower) => (
            <li key={follower.followername}>
                <a href={`./${follower.followername}`} onClick={(e)=>{e.preventDefault(); navigate(`/${follower.followername}`);}}>{follower.followername}</a>
            </li>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </ul>
    </div>
  );
};

export default Followers;
