// dependencies
const { string, boolean, array, number, date, object, addMethod } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');

const bookmarkSchema = object(
  {
    body: object({
      message_id: string().matches(UUID_REGEX).required(),
      creation_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
)

module.exports = { bookmarkSchema };