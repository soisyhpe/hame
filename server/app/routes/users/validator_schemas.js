// dependencies
import { string, number, date, object } from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX, UUID_REGEX } from '../../tools/validation_tools.js';

const getUsersSchema = object(
  {
    query: object({
      limit: number().positive().optional()
    })
  }
);

const getUserFromUsernameSchema = object(
  {
    params: object({
      username: string().min(3).max(16).required()
    }),
    query: object({
      limit: number().positive().optional()
    })

  }
)

const getUserFromIdSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id is not valid').required()
    }),
    query: object({
      limit: number().positive().optional()
    })
    
  }
)

const createUserSchema = object(
  {
    body: object({
      email: string().matches(EMAIL_REGEX, 'body.email is not valid').required(),
      firstname: string().min(1).max(32).required(),
      lastname: string().min(1).max(64).required(),
      birthdate: date().required(),
      username: string().min(3).max(16).required(),
      password: string().matches(PASSWORD_REGEX, 'body.password is not valid').required(),
      location: string().optional(),
      bio: string().optional(),
      website: string().optional(),
      profile_picture: string().default('').optional(),
      profile_banner: string().default('').optional(),
      creation_date: date().required()
    })
  }
)

const deleteUserSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id is not valid').required()
    })
  }
)

export { getUsersSchema, getUserFromUsernameSchema, getUserFromIdSchema, createUserSchema, deleteUserSchema };