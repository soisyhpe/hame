// dependencies
const express = require('express');
const { getFriends, addFriend, deleteFriend } = require('../../db/friends_db');
const { validate } = require('../../routes/validate_ressource');
const { friendsSchema, addFriendSchema, deleteFriendSchema } = require('./validator_schemas');

// express' stuff
const FRIENDS_API = express.Router();

FRIENDS_API.
  use(express.json())

  // friends : get friends
  .get('/:user_id', validate(friendsSchema), async (req, res) => {
    let result = await getFriends(req.params.user_id);

    if (!result) res.status(204).json({message: 'No friends was found for specified user'});
    else res.status(202).json(result);
  })

  // friends : add friend
  .post('/:user_id/', validate(addFriendSchema), async (req, res) => {
    let result = await addFriend(req.params.user_id, req.body.friend_id, req.body.creation_date);

    if (!result) res.status(400).json({message: 'Unable to add new friend for specified user'});
    else res.status(201).json({message: 'New friend was added successfully'});
  })

  // friends : delete friend
  .delete('/:user_id/:friend_id', validate(deleteFriendSchema), async (req, res) => {
    let result = await deleteFriend(req.params.user_id, req.params.friend_id);

    if (!result) res.status(204).json({message: 'Unable to delete friend'});
    else res.status(202).json({message: 'Friend was deleted successfully'});
  })

module.exports = { FRIENDS_API };