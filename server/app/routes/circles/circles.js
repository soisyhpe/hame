// dependencies
import { Router, json } from 'express';
import { getCircles, addCircle, deleteCircle } from '../../db/circles_db.js';
import { validate } from '../validate_ressource.js';
import { circlesSchema, addCircleSchema, removeCircleSchema } from './validator_schemas.js';

// express' stuff
const CIRCLES_API = Router();

CIRCLES_API.
  use(json())

  // circles : get circles
  .get('/:user_id', validate(circlesSchema), async (req, res) => {
    let result = await getCircles(req.params.user_id, req.query.limit);

    if (!result) res.status(204).json({message: 'No circles was found for specified user'});
    else res.status(202).json(result);
  })

  // circles : add circle
  .post('/:user_id/', validate(addCircleSchema), async (req, res) => {
    let result = await addCircle(req.params.user_id, req.body.circle_id, req.body.creation_date);

    if (!result) res.status(204).json({message: 'Unable to add circle for specified user'});
    else res.status(201).json({message: 'New circle was added successfully'});
  })

  // circles : remove circle
  .delete('/:user_id/:circle_id', validate(removeCircleSchema), async (req, res) => {
    let result = await deleteCircle(req.params.user_id, req.params.circle_id);

    if (!result) res.status(204).json({message : 'Unable to delete circle'});
    else res.status(202).json({message: 'Circle was deleted successfully'});
  })

export { CIRCLES_API };