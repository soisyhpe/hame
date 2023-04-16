// dependencies
import { Router, json } from 'express';
import { validate } from '../validate_ressource.js';

// express stuff
const SESSIONS_API = Router();

SESSIONS_API
  .use(json())

  // sessions : login
  .get('/login', async (req, res) => {
    if (req.session.user_id) {
      res.send('');
    }
  })

  // sessions : logout
  .get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })

export { SESSIONS_API };