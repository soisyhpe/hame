import React from 'react';

const Followers = ({ username }) => {
  const [followers, setFollowers] = React.useState([]);


  const fetchFollowers = async () => {
    const response = await fetch(`http://localhost:8000/v1/followers/${username}`);
    const data = await response.json();
    console.log(data);
    setFollowers(data);
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
            <li key={follower.follower_id}>
              <a href={`./${follower.follower_id}`}>{follower.follower_id}</a>
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
