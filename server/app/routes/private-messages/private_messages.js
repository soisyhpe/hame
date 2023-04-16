// dependencies
import { Router, json } from 'express';
import { getConversations, createConversation, getMessages, sendMessage, deleteMessage } from '../../db/private_messages_db.js';
import { validate } from '../validate_ressource.js';
import { conversationSchema, messageSchema } from './validator_schemas.js';

// express stuff
const PRIVATE_MESSAGES_API = Router();

PRIVATE_MESSAGES_API
  .use(json())

  // get all private conversations
  .get('/:user_id', async (req, res) => {
    let result = getConversations(req.params.user_id);

    if (!result) res.status(400).json({message: 'No private conversations was found'});
    else res.status(200).json(result);
  })
  
  // get all requests for private conversations
  .get('/:user_id/requests', async (req, res) => {
    let result = await getConversations(req.params.user_id, true);

    if (!result) res.status(400).json({message: 'No requests for private conversations was found'});
    else res.status(200).json(result);
  })

  // post a new conversation
  .post('/:author_id/conversations/', validate(conversationSchema), async (req, res) => {
    let result = await createConversation(req.params.author_id, req.body.participants, req.body.creation_date);

    if (!result) res.status(400).json({message: 'Unable to create a new conversation'});
    else res.status(201).json({message: 'New conversation was created successfully'});
  })
 
  // get all messages from a conversation
  .get('/:author_id/conversations/:conversation_id/messages', async (req, res) => {
    let result = await getMessages(req.params.author_id, req.params.conversation_id);

    if (!result) res.status(400).json({message: "No messages was found"});
    else res.status(200).json(result);
  })

  // post a new message
  .post('/:author_id/conversations/:conversation_id/messages/', validate(messageSchema), async (req, res) => {
    let result = await sendMessage(req.params.author_id, req.body.content, req.body.type, req.body.reply_to, req.body.is_read, req.params.conversation_id, req.body.sent_date);

    if (!result) res.status(400).json({message: 'Unable to post a new message'});
    else res.status(201).json({message: 'Message was posted successfully'});
  })

  // delete a message
  .delete('/:author_id/conversations/:conversation_id/messages/:message_id', async (req, res) => {
    let result = await deleteMessage(req.params.author_id, req.params.conversation_id, req.params.message_id);

    if (!result) res.status(400).json({message: 'Unable to delete message'});
    else res.status(200).json({message: 'Message was deleted successfully'});
  })

export { PRIVATE_MESSAGES_API }