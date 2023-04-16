// dependencies
import { Router, json } from 'express';
import { getUsers, getUserFromUsername, getUserFromId, deleteUser, createUser } from '../../db/users_db.js';
import { validate } from '../../routes/validate_ressource.js';
import { getUsersSchema, getUserFromUsernameSchema, getUserFromIdSchema, createUserSchema, deleteUserSchema } from './validator_schemas.js';

// express' stuff
const USERS_API = Router();

USERS_API.
  use(json())

  // users : get all users
  .get('/', validate(getUsersSchema), async (req, res) => {
    let result = await getUsers(req.query.limit);
    
    if (!result) res.status(204).json({ message: 'No users was found' });
    else res.status(200).json(result);
  })

  // users : get a specific user from username
  .get('/:username', validate(getUserFromUsernameSchema), async (req, res) => {
    let result = await getUserFromUsername(req.params.username, req.query.limit);

    if (!result) res.status(404).json({ message: 'User does not exist' });
    else res.status(200).json(result);
  })

  // users : get a specific user from id
  .get('/:user_id', validate(getUserFromIdSchema), async (req, res) => {
    let result = await getUserFromId(req.params.user_id, req.query.limit);

    if (!result) res.status(404).json({ message: 'User does not exist' });
    else res.status(200).json(result);
  })

  // users : post a new user
  .post('/', validate(createUserSchema), async (req, res) => {
    let result = await createUser(req.body.email, req.body.firstname, req.body.lastname, req.body.birthdate, req.body.username, req.body.password, req.body.location, req.body.bio, req.body.website, req.body.profile_picture, req.body.profile_banner, req.body.creation_date);
    
    if (!result) res.status(400).json({ message: 'Unable to create a new user' });
    else res.status(201).json({ message: 'New user was created successfully' });
  })

  // users : delete a existing user
  .delete('/:user_id/', validate(deleteUserSchema), async (req, res) => {
    let result = await deleteUser(req.params.user_id);

    if (!result) res.status(404).json({ message: 'User does not exist' });
    else res.status(202).json({ message: 'User account was deleted successfully' });
  })

export { USERS_API };