// dependencies
const express = require('express');
const usersDB = require('../../db/usersDB');
const { validate } = require('../../routes/validate_ressource');
const { userSchema } = require('./validator_schemas');

// express' stuff
const USERS_API = express.Router();

USERS_API.
  use(express.json())

  // get all users
  .get('/', async (req, res) => {
    let result = await usersDB.listUsers();
    
    if (!result) res.status(204).json({message: 'No users was found'});
    else res.status(200).json(result);
  })

  // get a specific user from id
  .get('/:userId', async (req, res) => {
    let result = await usersDB.getUserById(req.params.id)

    if (!result) res.status(404).json({message: "User does not exist"});
    else res.status(200).json(result);
  })

  // post a new user
  .post('/', validate(userSchema), async (req, res) => {
    let result = await usersDB.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.birthDate, req.body.userName, req.body.password);
    
    if (!result) res.status(400).json({message: 'Unable to create a new user'});
    else res.status(201).json({message: 'New user was created successfully', userid: result});
  })

  // delete a existing user
  .delete('/:user_id', async (req, res) => {
    let result = await deleteUser(id)

    if (!result) res.status(404).json({message: 'User does not exist'});
    else res.status(204).json({message: 'User account was deleted successfully'});
  })

module.exports = { USERS_API };