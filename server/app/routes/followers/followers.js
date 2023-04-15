// dependencies
const express = require('express');
const { getFollowers, addFollower, deleteFollower } = require('../../db/followers_db');
const { validate } = require('../../routes/validate_ressource');
const { followersSchema, addFollowSchema, removeFollowSchema } = require('./validator_schemas');

// express' stuff
const FOLLOWERS_API = express.Router();

FOLLOWERS_API.
  use(express.json())

  // followers : get followers
  .get('/:user_id', validate(followersSchema), async (req, res) => {
    let result = await getFollowers(req.params.user_id, req.query.limit);

    if (!result) res.status(204).json({message: 'No followers was found for specified user'});
    else res.status(202).json(result);
  })

  // followers : add follower
  .post('/:user_id/', validate(addFollowSchema), async (req, res) => {
    let result = await addFollower(req.params.user_id, req.body.follower_id, req.body.creation_date);

    if (!result) res.status(204).json({message: 'Unable to add new follower for specified user'});
    else res.status(201).json({message: 'New follower was added successfully'});
  })

  // followers : delete follower
  .get('/:user_id/:follower_id', validate(removeFollowSchema), async (req, res) => {
    let result = await deleteFollower(req.params.user_id, req.params.follower_id);

    if (!result) res.status(204).json({message : 'Unable to delete follower, specified friend is not a follower of user'});
    else res.status(202).json({message: 'Follower was deleted successfully'});
  })

module.exports = { FOLLOWERS_API };