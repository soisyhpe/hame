// dependencies
const { string, boolean, array, number, date, object, addMethod } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');


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


module.exports = { bookmarkSchema, getBookmarksSchema, deleteBookmarkSchema };