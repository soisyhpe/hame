// dependencies
const { object, string, number, date } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');

const friendsSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
)

const addFriendSchema = object(
  {
    body: object({
      friend_id: string().matches(UUID_REGEX).required(),
      creation_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
)

const deleteFriendSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      friend_id: string().matches(UUID_REGEX).required()
    })
  }
)

module.exports = { friendsSchema, addFriendSchema, deleteFriendSchema };