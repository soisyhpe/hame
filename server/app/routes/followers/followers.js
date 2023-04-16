// dependencies
import { Router, json } from 'express';
import { getFollowers, addFollower, deleteFollower } from '../../db/followers_db.js';
import { validate } from '../../routes/validate_ressource.js';
import { followersSchema, addFollowSchema, removeFollowSchema } from './validator_schemas.js';

// express' stuff
const FOLLOWERS_API = Router();

FOLLOWERS_API.
  use(json())

  // followers : get followers
  .get('/:user_id', validate(followersSchema), async (req, res) => {
    let result = await getFollowers(req.params.user_id, req.query.limit);

    if (!result) res.status(204).json({message: 'No follower was found for specified user'});
    else res.status(202).json(result);
  })

  // followers : add follower
  .post('/:user_id/', validate(addFollowSchema), async (req, res) => {
    let result = await addFollower(req.params.user_id, req.body.follower_id, req.body.creation_date);

    if (!result) res.status(204).json({message: 'Unable to add new follower for specified user'});
    else res.status(201).json({message: 'New follower was added successfully'});
  })

  // followers : delete follower
  .delete('/:user_id/:follower_id', validate(removeFollowSchema), async (req, res) => {
    let result = await deleteFollower(req.params.user_id, req.params.follower_id);

    if (!result) res.status(204).json({message : 'Unable to delete follower, specified friend is not a follower of user'});
    else res.status(202).json({message: 'Follower was deleted successfully'});
  })

export { FOLLOWERS_API };