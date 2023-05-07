import tom_anderson from '../assets/medias/tom_anderson.jpg';

const fetchCountMessagesFromUserId = async (userId) => {
  const response = await fetch(`http://localhost:8000/v1/messages/${userId}`)
  const data = await response.json();
  return data.length;
}

const fetchMessagesFromUserId = async (userId) => {
  const response = await fetch(`http://localhost:8000/v1/messages/${userId}`)
  const data = await response.json();
  return data;
}

const fetchUserFromUserId = async (userId) => {
  const response = await fetch(`http://localhost:8000/v1/users?user_id=${userId}`);
  const data = await response.json();
  return data[0];
};

const fetchUserFromUsername = async (username) => {
  const response = await fetch(`http://localhost:8000/v1/users?username=${username}`);
  const data = await response.json();
  return data[0];
};

const fetchProfilePictureFromUserId = async (userId) => {
  return {tom_anderson};
  // const response = await fetch(`http://localhost:8000/v1/users?user_id=${userId}`);
  // const data = await response.json();
  // return data.profile_picture;
};

const fetchProfilePictureFromUsername = async (username) => {
  return {tom_anderson};
  // const response = await fetch(`http://localhost:8000/v1/users?username=${username}`);
  // const data = await response.json();
  // return data.profile_picture;
};

const fetchUsernameFromUserId = async (userId) => {
  const response = await fetch(`http://localhost:8000/v1/users?user_id=${userId}`);
  const data = await response.json();
  return data[0].username;
};

const fetchUsernameFromUserIdNoAsync = (userId) => {
  let result = fetch(`http://localhost:8000/v1/users?user_id=${userId}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data.username;
    }
  );

  return result;

};

export { fetchCountMessagesFromUserId, fetchMessagesFromUserId, fetchUserFromUserId, fetchUserFromUsername, fetchProfilePictureFromUserId, fetchProfilePictureFromUsername, fetchUsernameFromUserId };