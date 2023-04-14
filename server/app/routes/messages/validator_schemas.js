// dependencies
const { object, string, number, boolean, date } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');

const messagesSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

const messagesFromUserSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

const messageFromIdSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX).required()
    })
  }
);

const sendMessageSchema = object(
  {
    body: object({
      text: string().min(1).max(256).required(),
      replied_to: string().matches(UUID_REGEX).default('').required(),
      reposted_from: string().matches(UUID_REGEX).default('').required(),
      place: object({
        position: object({
          latitude: number().min(-90).max(90).required(),
          longitude: number().min(-180).max(180).required(),
          altitude: number().min(-414).max(8848).required()
        }).required(),
        country: string().min(1).required(),
        country_code: string().required(),
        city: string().min(1).required(),
        street: string().optional(),
        postalCode: number().optional()
      }).optional(),
      media: object({
        type: string().oneOf(['IMAGE', 'VIDEO', 'GIF', 'WEBSITE']).required(),
        url: string().required()
      }).optional(),
      source: string().required(),
      scope: string().oneOf(['DEFAULT', 'CIRCLES']).required(),
      creation_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX).required()
    })
  }
);

const responsesSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

const deleteMessageSchema = object(
  {
    body: object({
      user_id: string().matches(UUID_REGEX).required()
    }),
    params: object({
      message_id: string().matches(UUID_REGEX).required()
    })
  }
);

const likingUsersSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

const likeMessageSchema = object(
  {
    body: object({
      user_id: string().matches(UUID_REGEX).required(),
      creation_date: date().required()
    }),
    params: object({
      message_id: string().matches(UUID_REGEX).required()
    })
  }
);

const unlikedMessageSchema = object(
  {
    body: object({
      user_id: string().matches(UUID_REGEX).required(),
    }),
    params: object({
      message_id: string().matches(UUID_REGEX).required()
    })
  }
);

const likedMessagesSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

const respostingUsersSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

const respostedMessagesSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX).required(),
      limit: number().positive().optional()
    })
  }
);

module.exports = { messagesSchema, messagesFromUserSchema, messageFromIdSchema, sendMessageSchema, responsesSchema, deleteMessageSchema, likingUsersSchema, likeMessageSchema, unlikedMessageSchema, likedMessagesSchema, respostingUsersSchema, respostedMessagesSchema };