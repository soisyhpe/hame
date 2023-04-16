// dependencies
import { object, string, number, date } from 'yup';
import { UUID_REGEX } from '../../tools/validation_tools.js';

const followersSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
    }),
    query: object({
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

export { followersSchema, addFollowSchema, removeFollowSchema };