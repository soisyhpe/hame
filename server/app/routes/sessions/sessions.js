// dependencies
import { Router, json } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { getSessions, login, logout } from '../../db/sessions_db.js';
import { isUser } from '../../db/users_db.js';
import { validate } from '../validate_ressource.js';
import { sessionSchema } from './validator_schemas.js'

// express stuff
const SESSIONS_API = Router();

SESSIONS_API
  .use(json())

  // sessions : login
  .post('/login', async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;
    const authToken = jsonwebtoken.sign({ username, password }, "DUMMYKEY");

    // check if email and password are valid
    if (!isUser(email, password)) {
      res.status(401).json({ message: "Unable to authenticate you" });
    }

    res.cookie("authToken", authToken, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.sendStatus(200);

    // create new session
    /*let result = await login(req.body.user_id, req.session, req.body.creation_date);

    if (result) res.status(201).json({ message: "You're logged in successfully" });
    else res.status(400).json({ message: "Unable to create new session" });*/
  })

  // sessions : autologin
  .get('/autoLogin', async (req, res) =>{
    const cookie = req.headers.cookie;

    // if we received no cookies then user needs to login
    if (!cookie || cookie === null) {
      return res.sendStatus(401);
    }

    return res.sendStatus(200);
  })

  // sessions : logout
  .get('/logout', async (req, res) => {
    res.clear("authToken");
    return res.sendStatus(200);
  })

export { SESSIONS_API };