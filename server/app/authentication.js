// dependencies
const express = require('express')
const usersDB = require('./mongo/usersDB')

// express' stuff
const app = express()
const authentication_api = express.Router()




authentication_api.
  use(express.json())

  // get all users
  .get('/user', (req, res) => {
    res.json(usersDB.listUsers())
  })

  // get a specific user from id
  .get('/user/:id', (req, res) => {
    // call dedicated function
    const result = usersDB.getUserById(req.params.id)

    // check 
    if (result == false) {
      res
        .status(404)
        .json({
          message: "User does not exist"
        })
    }

  })

  // post a new user
  .post('/user/:id', (req, res) => {
    // request parameters
    const { email, firstName, lastName, userName, birthDate, password } = req.body

    // call dedicated function
    const result = usersDB.createUser(email, firstName, lastName, birthDate, userName, password)
    
    // check if new user was created
    if (result == false) {
      res
        .status(400)
        .json({
          message : result
        });
    }
    
    // response
    res
      .status(201)
      .json({
        message: "User was created successfully"
      })

  })

  // patch a user (update a user)
  .patch('/user/:id', (req, res) => {
    // request parameters
  })

  // delete a existing user
  .delete('/user/:id', (req, res) => {
    // parameters
    const { email, pseudo } = req.body

    // call dedicated function
    const result = deleteUser(pseudo)

    // check if user was deleted
    if (result == false) {
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

app
  .use('/authentication', authentication_api)
  .listen(8000)