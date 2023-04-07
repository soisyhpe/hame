// dependencies
const express = require('express');
const usersDB = require('../db/usersDB');
const authentication_tools = require('../tools/authentication_tools')

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
  .post('/', (req, res) => {
    // request parameters
    const { email, firstName, lastName, userName, birthDate, password } = req.body

    // check for missing fields
    const missing_fields = []
    if (!email) missing_fields.push({message:"The field is missing", field:"email"})
    if (!firstName) missing_fields.push({message:"The field is missing", field:"firstName"})
    if (!lastName) missing_fields.push({message:"The field is missing", field:"lastName"})
    if (!birthDate) missing_fields.push({message:"The field is missing", field:"birthDate"})
    if (!userName) missing_fields.push({message:"The field is missing", field:"birthDate"})
    if (!password) missing_fields.push({message:"The field is missing", field:"password"})

    if (missing_fields.length > 0) {
      res
        .status(400)
        .json({
          message: "There are missing fields in you request",
          errors: missing_fields
        })
    }

    // check validity of fields
    const valid_fields = []
    if (!authentication_tools.checkEmail(email)) valid_fields.push({message:"Format should be something like mymail@gmail.com", field:"email"})
    if (!authentication_tools.checkFirstName(firstName)) valid_fields.push({message:"Length should be between 1 and 32", field:"firstName"})
    if (!authentication_tools.checkLastName(lastName)) valid_fields.push({message:"Length should be between 1 and 64", field:"lastName"})
    if (!authentication_tools.checkBirthDate(birthDate)) valid_fields.push({message:"Invalid date format", field:"birthDate"})
    if (!authentication_tools.checkUserName(userName)) valid_fields.push({message:"Length should be between 3 and 16", field:"userName"})
    if (!authentication_tools.checkPassword(password)) valid_fields.push({message:"Password length most be at least 6 and must contains numbers", field:"password"})

    if (valid_fields.length > 0) {
      res
        .status(400)
        .json({
          message: "Validation errors in your request",
          errors: valid_fields
        })
    }

    // call dedicated function
    const result = usersDB.createUser(email, firstName, lastName, birthDate, userName, password)

    // check if new user was created
    if (result === false) {
      res
        .status(400)
        .json({
          message : result
        })
    }
    
    // response
    res
      .status(201)
      .json({
        message: "User was created successfully"
      })

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