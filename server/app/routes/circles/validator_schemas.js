// dependencies
const { object, string, number, date } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');

const circlesSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
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

module.exports = { circlesSchema, addCircleSchema, removeCircleSchema };