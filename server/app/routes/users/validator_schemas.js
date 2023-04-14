// dependencies
const { string, boolean, array, number, date, object } = require('yup');
const { UUID_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = require('../../tools/validation_tools');

const userSchema = object(
  {
    body: object({
      email: string().matches(EMAIL_REGEX, 'email is not valid').required(),
      firstname: string().min(1).max(32).required(),
      lastname: string().min(1).max(64).required(),
      birthdate: date().required(),
      username: string().min(3).max(16).required(),
      password: string().matches(PASSWORD_REGEX, 'password is not valid').required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX, 'author_id must contains a valid UUID').required()
    })
  }
)

module.exports = { userSchema };