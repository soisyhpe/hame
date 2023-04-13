// dependencies
const { object, string, number, date } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');

const followersSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
)

const addFollowSchema = object(
  {
    body: object({
      follower_id: string().matches(UUID_REGEX).required(),
      creation_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
)

const removeFollowSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      follower_id: string().matches(UUID_REGEX).required()
    })
  }
)

module.exports = { followersSchema, addFollowSchema, removeFollowSchema };