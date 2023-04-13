// dependencies
const express = require('express');
const { getBlockedUsers, blockUser, unblockUser } = require('../../db/blocked_users_db');
const { validate } = require('../validate_ressource');
const { blockedUsersSchema, blockUserSchema, unblockUserSchema } = require('./validator_schemas');

// express stuff
const BLOCKED_USERS_API = express.Router();

BLOCKED_USERS_API.
  use(express.json())

  // blocked users : get all blocked users
  .get('/:user_id', validate(blockedUsersSchema), async (req, res) => {
    let result = await getBlockedUsers(req.params.user_id, req.params.limit);

    if (!result) res.status(204).json({message: 'No blocked users was found for specified user'});
    else res.status(202).json(result);
  })

  // blocked users : block user
  .post('/:user_id/', validate(blockUserSchema), async (req, res) => {
    let result = await blockUser(req.params.user_id, req.body.blocked_user_id, req.body.blocked_date);

    if (!result) res.status(204).json({message: 'Unable to add new blocked user for specified user'});
    else res.status(201).json({message: 'New user was blocked successfully'});
  })

  // blocked users : unblock user
  .get('/:user_id/:blocked_user_id', validate(unblockUserSchema), async (req, res) => {
    let result = await unblockUser(req.params.user_id, req.params.blocked_user_id);

    if (!result) res.status(204).json({message : 'Unable to delete blocked user, specified user is not a blocked by user'});
    else res.status(202).json({message: 'User was unblocked successfully'});
  })

module.exports = { BLOCKED_USERS_API };