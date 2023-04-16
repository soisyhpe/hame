// dependencies
import { object, string, number, date } from 'yup';
import { UUID_REGEX } from '../../tools/validation_tools.js';

const circlesSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
)

const addCircleSchema = object(
  {
    body: object({
      circle_id: string().matches(UUID_REGEX).required(),
      creation_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
)

const removeCircleSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      circle_id: string().matches(UUID_REGEX).required()
    })
  }
)

export { circlesSchema, addCircleSchema, removeCircleSchema };