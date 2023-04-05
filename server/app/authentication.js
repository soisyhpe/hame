const express = require('express')
//const regex = require('./tools/regex.js')

//import { createUser, deleteUser } from './mongo/usersDB.js'

const app = express()
const authentication_api = express.Router()

const email_regex = new RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/")
const pseudo_regex = new RegExp("\S")
const firstName_regex = new RegExp("\S")
const lastName_regex = new RegExp("\S")
const password_regex = new RegExp("\S")

authentication_api.
  use(express.json())

  // get all users
  .get('/user', (req, res) => {
   res.json({
    "ok" :""
   })
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
    console.log(email)
    console.log(email_regex.test(email))
    if (!email_regex.test(email)) {
      res.status(400).send("Requête invalide : format email invalide !")
    }

    // check for pseudo validity
    if (pseudo_regex.test(pseudo)) {
      res.status(400).send("Requête invalide : format pseudo invalide !")
    }

    // check for firstName validity
    if (firstName_regex.test(firstName)) {
      res.status(400).send("Requête invalide : format firstName invalide !")
    }

    // check for lastName validity
    if (lastName_regex.test(lastName)) {
      res.status(400).send("Requête invalide : format lastName invalide !")
    }

    // check for password validity
    if (password_regex.test(password)) {
      res.status(400).send("Requête invalide : format password invalide !")
    }

    // todo : call dedicated function and use return value for the res
    // createUser(email, pseudo, firstName, lastName, password)

    /* res.json({
      "id": ""
    } */

  })

  // delete a existing user
  .delete('/user/:id', (req, res) => {
    
    const { email, pseudo } = req.body

    // check if request is complete
    if (!email || !pseudo) {
      res.status(400).send("Requête invalide : email ou pseudo sont nécessaires !");
    }

    // todo : vérifie que l'utilisateur existe (modifier deleteUser)
    // deleteUser(pseudo)

    res.json({
      "deleted": "true"
    })

  })

app
  .use('/authentication', authentication_api)
  .listen(8000)