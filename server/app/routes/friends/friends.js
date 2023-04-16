// dependencies
import { Router, json } from 'express';
import { getFriends, addFriend, deleteFriend } from '../../db/friends_db.js';
import { validate } from '../../routes/validate_ressource.js';
import { friendsSchema, addFriendSchema, deleteFriendSchema } from './validator_schemas.js';

// express' stuff
const FRIENDS_API = Router();

FRIENDS_API.
  use(json())

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

export { FRIENDS_API };