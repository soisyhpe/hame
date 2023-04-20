// dependencies
import { Router, json } from 'express';
import { getSessions, login, logout } from '../../db/sessions_db.js';
import { isUser } from '../../db/users_db.js';
import { validate } from '../validate_ressource.js';
import { sessionSchema } from './validator_schemas.js'

// express stuff
const SESSIONS_API = Router();

SESSIONS_API
  .use(json())

  // todo : sessions : active sessions

  // sessions : login
  .post('/user', validate(sessionSchema), async (req, res) => {
    if (req.session.user_id) { // already logged in
      res.status(204).json({ message: "You're already logged in" });
    } else { // not logged in

      // check if email and password are valid
      if (!isUser(req.body.email, req.body.password)) {
        res.status(401).json({ message: "Unable to authenticate you" });
      }

      // create new session
      let result = await login(req.body.user_id, req.session, req.body.creation_date);

      if (result) res.status(201).json({ message: "You're logged in successfully" });
      else res.status(400).json({ message: "Unable to create new session" });
    }
  })

  // sessions : logout
  .get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })

export { SESSIONS_API };