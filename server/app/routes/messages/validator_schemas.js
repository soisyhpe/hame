// dependencies
import { object, string, number, date } from 'yup';
import { UUID_REGEX } from '../../tools/validation_tools.js';

const messagesSchema = object(
  {
    query: object({
      limit: number().positive().optional(),
      text : string().optional()
    })
  }
);

const messagesFromUserSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);

const messageFromIdSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required()
    })
  }
);

const sendMessageSchema = object(
  {
    body: object({
      text: string().min(1).max(256).required(),
      replied_to: string().optional().matches(UUID_REGEX, 'params.replied_id must be a valid uuid'),
      reposted_from: string().optional().matches(UUID_REGEX, 'params.reposted_id must be a valid uuid'),
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
        postal_code: number().optional()
      }).optional().default(undefined),
      media: object({
        type: string().oneOf(['image', 'video', 'gif', 'website']).required(),
        url: string().required()
      }).optional().default(undefined),
      source: string().required(),
      scope: string().oneOf(['default', 'circles']).required(),
      creation_date: date().required()
    }),
    params: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required()
    })
  }
);

const responsesSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);

const deleteMessageSchema = object(
  {
    body: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required()
    }),
    params: object({
      message_id: string().matches(UUID_REGEX, 'message.user_id must be a valid uuid').required()
    })
  }
);

const likingUsersSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);

const likeMessageSchema = object(
  {
    body: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required(),
      creation_date: date().required()
    }),
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required()
    })
  }
);

const isLikedBySchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required(),
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required()
    })
  }
);
const unlikedMessageSchema = object(
  {
    body: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required(),
    }),
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required()
    })
  }
);

const likedMessagesSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);

const repostingUsersSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);

const repostedMessagesSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required(),
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);

const repostedMessagesofUserSchema = object(
  {
    params: object({
      user_id: string().matches(UUID_REGEX, 'params.user_id must be a valid uuid').required()
    }),
    query: object({
      limit: number().positive().optional()
    })
  }
);


const modifyMessageSchema = object(
  {
    params: object({
      message_id: string().matches(UUID_REGEX, 'params.message_id must be a valid uuid').required()
    }),
    body: object({
      text: string().min(1).max(256).required(),
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
      }).optional().default(undefined),
      media: object({
        type: string().oneOf(['IMAGE', 'VIDEO', 'GIF', 'WEBSITE']).required(),
        url: string().required()
      }).optional().default(undefined)
    })
  }
);

export { messagesSchema, messagesFromUserSchema, messageFromIdSchema, sendMessageSchema, responsesSchema, deleteMessageSchema, likingUsersSchema, likeMessageSchema, isLikedBySchema, unlikedMessageSchema, likedMessagesSchema, repostingUsersSchema, repostedMessagesSchema, repostedMessagesofUserSchema, modifyMessageSchema };