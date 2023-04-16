// dependencies
import { object, string, number, date } from 'yup';
import { UUID_REGEX } from '../../tools/validation_tools.js';

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

export { friendsSchema, addFriendSchema, deleteFriendSchema };