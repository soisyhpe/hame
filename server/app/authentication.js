const express = require('express')
const regex = require('./tools/regex.js')

const app = express()
const authentication_api = express.Router()

authentication_api.
  use(express.json())

  // get all users
  .get('/user', (req, res) => {
    
  })

  // get a specific user from id
  .get('/user/:id', (req, res) => {
    // req.params.id

    // todo : check if not exists

    // todo : return user's id

  })

  // put a new user
  .put('/user/:id', (req, res) => {
    const { email, pseudo, firstName, lastName, password } = req.body

    // check if request is complete
    if (!email || !pseudo || !firstName || !lastName || !password) {
      res.status(400).send("Requête invalide : email, pseudo, firstName, lastName ou password sont nécessaires !");
    }

    // check for email validity
    if (!regex.email.test(email)) {
      res.status(400).send("Requête invalide : format email invalide !")
    }

    // check for pseudo validity
    if (regex.pseudo.test(pseudo)) {
      res.status(400).send("Requête invalide : format pseudo invalide !")
    }

    // check for firstName validity
    if (regex.firstName.test(firstName)) {
      res.status(400).send("Requête invalide : format firstName invalide !")
    }

    // check for lastName validity
    if (regex.lastName.test(lastName)) {
      res.status(400).send("Requête invalide : format lastName invalide !")
    }

    // check for password validity
    if (regex.lastName.test(lastName)) {
      res.status(400).send("Requête invalide : format password invalide !")
    }

    // todo : call dedicated function and use return value for the res

    res.json({
      "id": ""
    })



    console.log("")


  })

  // delete a existing user
  .delete('/user/:id', (req, res) => {

    // todo : check if not exists

    // todo : return deleted id

  })

app
  .use('/authentication', authentication_api)
  .listen(8000)