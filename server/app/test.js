const express = require('express')
const app = express()
const api = express.Router()

api
  .use(express.json())

  .post('/api', (req, res) => {
    const {name, nb1, nb2} = req.body

    // vérifie qu'il y a name, nb1 et nb2
    if (!name || !nb1 || !nb2) {
      res.status(400).send("Requête invalide : name, nb1 et nb2 sont nécessaires")
    }

    console.log(name)

    // vérifie que nb1 et nb2 sont des nombres
    if (isNaN(nb1) || isNaN(nb2)) {
      res.status(400).send("Requête invalide : nb1 et nb2 doivent être des nombres")
    }

    // envoie d'une réponse
    res.json({ "addition": nb1 + nb2, "prop": "hello"})
  })

app
  .use('/', api)
  .listen(8000)