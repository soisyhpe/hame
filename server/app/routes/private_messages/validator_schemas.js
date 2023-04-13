// dependencies
const { string, boolean, array, number, date, object, addMethod } = require('yup');
const { UUID_REGEX } = require('../../tools/validation_tools');

const conversationSchema = object(
  {
    body: object({
      participants: array().min(2, 'conversation with participants lower than 2 is not allowed').max(2, 'actually, you cannot create conversation with more than 2 participants').required(),
      creation_date: date().required()
    }),
    params: object({
      author_id: string().matches(UUID_REGEX, 'author_id must contains a valid UUID').required()
    })
  }
)

addMethod(array, 'matcheUUID', () => {
  const { message, precidate } = args;
  return this.test(
    '',
    'Not all items in ${path} ',
    items => items.every(item => {
      return 
    })
  );
})

const messageSchema = object(
  {
    body: object({
      content: string().min(1, 'content with no length is not allowed').max(256, 'content maximum length should be lower than 256 characters').required(),
      type: string().oneOf(['TEXT', 'FILE', 'VOICE', 'PICTURE', 'VIDEO'], 'wrong type').default(() => "TEXT").optional(),
      reply_to: string().matches(UUID_REGEX, 'reply_to must contains a valid UUID').required(),
      is_read: boolean().default(() => false).optional(),
      conversation_id: string().matches(UUID_REGEX, 'conversation_id should contains a valid UUID').required(),
      sent_date: date().required()
    }),
    params: object({
      author_id: number().positive().required()
    })
  }
)

module.exports = { conversationSchema, messageSchema };