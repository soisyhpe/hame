// dependencies
const express = require('express');
const { getMessages, getMessagesFromUser, getMessageFromId, sendMessage, getResponses, deleteMessage, likeMessage, unlikeMessage, likingUsers, likedMessages, repostingUsers, repostedMessages } = require('../../db/messages_db');
const { validate } = require('../../routes/validate_ressource');
const { messagesSchema, messagesFromUserSchema, messageFromIdSchema, sendMessage, responsesSchema, deleteMessageSchema } = require('./validator_schemas');

// express' stuff
const MESSAGES_API = express.Router();

MESSAGES_API
  .use(express.json())

  // messages : get messages
  .get('/', validate(messagesSchema), async (req, res) => {
    let result = await getMessages(req.params.limit);

    if (!result) res.status(204).json({message: 'No messages was found'});
    else res.status(202).json(result);
  })

  // messages : get messages of user
  .get('/:user_id', validate(messagesFromUserSchema), async (req, res) => {
    let result = await getMessagesFromUser(req.params.user_id, req.params.limit);

    if (!result) res.status(204).json({message: 'No messages was found for user'});
    else res.status(202).json(result);
  })

  // messages : get message from id
  .get('/:message_id', validate(messageFromIdSchema), async (req, res) => {
    let result = await getMessageFromId(req.params.message_id);

    if (!result) res.status(204).json({message: 'Message do not exist'});
    else res.status(200).json(result);
  })

  // messages : send new message
  .post('/:user_id/', validate(sendMessageSchema), async (req, res) => {
    let result = await sendMessage(req.params.user_id, req.body.text, req.body.repliedTo, req.body.repostedFrom, req.body.place, req.body.media, req.body.source, req.body.scope, req.body.creation_date);

    if (!result) res.status(400).json({message: 'Unable to send new message'});
    else res.status(201).json({message: 'New message was sended successfully'});
  })

  // messages : get responses of a message
  .get('/:message_id/responses', validate(responsesSchema), async (req, res) => {
    let result = await getResponses(req.params.user_id, req.params.limit);

    if (!result) res.status(204).json({message: 'No responses was found for this message'});
    else res.status(202).json(result);
  })

  // messages : delete message
  .delete('/:message_id', async (req, res) => {
    let result = await deleteMessage(req.params.message_id, req.body.user_id);

    if (!result) res.status(204).json({message: 'No message was found'});
    else res.status(202).json({message: 'Message was deleted successfully'});
  })

  // message : put a message (modify a message)
  .put('/:messageId', (req, res) => {

  })

  // messages : liking users of a message
  .get('/:message_id/liking-users', async (req, res) => {
    
  })

  // messages : like a message
  .post('/:message_id/likes/', async (req, res) => {

  })

  // messages : unlike a message
  .delete('/:message_id/likes/:user_id', async (req, res) => {
    
  })

  // messages : liked messages of an user
  .get('/:user_id/liked-messages', async (req, res) => {

  })

  // messages : reposting users of a message
  .get('/:message_id/reposting-user', async (req, res) => {

  })

  // messages : reposted messages of a message
  .get('/:message_id/reposted-messages', async (req, res) => {

  })

module.exports = { MESSAGES_API }