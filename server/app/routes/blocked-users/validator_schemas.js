// dependencies
import { string, number, date, object } from 'yup';
import { UUID_REGEX } from '../../tools/validation_tools.js';

const blockedUsersSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
)

const blockUserSchema = object(
  {
    body: object({
      blocked_user_id: string().matches(UUID_REGEX).required(),
      blocked_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
);


const unblockUserSchema = object(
  {
    body: object({
      blocked_user_id: string().matches(UUID_REGEX).required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
);

export { blockedUsersSchema, blockUserSchema, unblockUserSchema };