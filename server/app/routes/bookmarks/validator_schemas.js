// dependencies
import { string, number, date, object } from 'yup';
import { UUID_REGEX } from '../../tools/validation_tools.js';

const getBookmarksSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
)

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

const deleteBookmarkSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      bookmark_id: string().matches(UUID_REGEX).required()
    })
  }
)

export { bookmarkSchema, getBookmarksSchema, deleteBookmarkSchema };