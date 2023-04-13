// dependencies
const express = require('express');
const usersDB = require('../../db/usersDB');
const authentication_tools = require('../../tools/authentication_tools')

// express' stuff
const USERS_API = express.Router();

USERS_API.
  use(express.json())

  // get all users
  .get('/', (req, res) => {
    res.json(usersDB.listUsers())
  })

  // get a specific user from id
  .get('/:userId', (req, res) => {
    // call dedicated function
    const result = usersDB.getUserById(req.params.id)

    // check 
    if (result === false) {
      res
        .status(404)
        .json({
          message: "User does not exist"
        })
    }

    // response
    res
      .status(200)
      .json({
        id: "",
        email: "",
        firstName
      })

  })

  // post a new user
  .post('/', async (req, res) => {
    // request parameters
    const { email, firstName, lastName, userName, birthDate, password } = req.body

    // call dedicated function
    const result = await usersDB.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.birthDate, req.body.userName, req.body.password)

    // check if new user was created
    if (result === false) {
      res
        .status(400)
        .json({
          message : result
        })
    }
    
    // response
    res.status(201).json({message: "User was created successfully"});

  })

  // delete a existing user
  .delete('/:userId', (req, res) => {

    // call dedicated function
    const result = deleteUser(id)

    // check if user was deleted
    if (result === false) {
      res
        .status(404)
        .json({
          message: "User does not exist"
        })
    }

    // response
    res
      .status(204)
      .json({ 
        message: "User account was deleted successfully" 
      })
  })

  // following : get all following users
  .get('/:userId/following', (req, res) => {

  })

  // following : post a new following user
  .post('/:userId/following/', (req, res) => {

  })

  // following : delete a following user
  .delete('/:userId/following/:userId', (req, res) => {

  })

  // followers : get all followers users
  .get('/:userId/followers', (req, res) => {

  })

  // followers : post a new following user
  .get('/:userId/followers/', (req, res) => {

  })

  // followers : delete a following user
  .get('/:userId/followers/:userId', (req, res) => {

  })

module.exports = { USERS_API };