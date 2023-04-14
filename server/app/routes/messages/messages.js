// dependencies
const express = require('express');
const { getMessages, getMessagesFromUser, getMessageFromId, sendMessage, getResponses, deleteMessage, likeMessage, unlikeMessage, likingUsers, likedMessages, repostingUsers, repostedMessages } = require('../../db/messages_db');
const { validate } = require('../../routes/validate_ressource');
const { messagesSchema, messagesFromUserSchema, messageFromIdSchema, sendMessageSchema, responsesSchema, deleteMessageSchema, likingUsersSchema, likeMessageSchema, unlikedMessageSchema, likedMessagesSchema, respostingUsersSchema, repostedMessagesSchema } = require('./validator_schemas');

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
  .delete('/:message_id', validate(deleteMessageSchema), async (req, res) => {
    let result = await deleteMessage(req.params.message_id, req.body.user_id);

    if (!result) res.status(204).json({message: 'No message was found'});
    else res.status(202).json({message: 'Message was deleted successfully'});
  })

  // todo : modify a message

  // messages : liking users of a message
  .get('/:message_id/liking-users', validate(likingUsersSchema), async (req, res) => {
    let result = await likingUsers(req.params.message_id, req.params.limit);

    if (!result) res.status(204).json({ message: 'No liking users was found' });
    else res.status(202).json(result);
  })

  // messages : like a message
  .post('/:message_id/likes/', validate(likeMessageSchema), async (req, res) => {
    let result = await likeMessage(req.params.message_id, req.body.user_id, req.body.creation_date);

    if (!result) res.status(204).json({ message: 'Unable to like this message' });
    else res.status(200).json({ message: 'Message was liked successfully' });
  })

  // messages : unlike a message
  .delete('/:message_id/likes/:user_id', validate(unlikedMessageSchema), async (req, res) => {
    let result = await unlikeMessage(req.params.message_id, req.body.user_id);

    if (!result) res.status(204).json({ message: 'Unable to unlike this message' });
    else res.status(200).json({ message: 'Message was unliked successfully' });
  })

  // messages : liked messages of an user
  .get('/:user_id/liked-messages', validate(likedMessagesSchema), async (req, res) => {
    let result = await likedMessages(req.params.user_id, req.params.limit);

    if (!result) res.status(204).json({ message: 'No liked messages was found' });
    else res.status(202).json(result);
  })

  // messages : reposting users of a message
  .get('/:message_id/reposting-user', validate(respostingUsersSchema), async (req, res) => {
    let result = await repostingUsers(req.params.message_id, req.params.limit);

    if (!result) res.status(204).json({ message: 'No reposting users was found' });
    else res.status(202).json(result);
  })

  // messages : reposted messages of a message
  .get('/:message_id/reposted-messages', validate(repostedMessagesSchema), async (req, res) => {
    let result = await repostedMessages(req.params.message_id, req.params.limit);

    if (!result) res.status(204).json({ message: 'No reposted messages was found' });
    else res.status(202).json(result);
  })

  // todo : reposted messages of an user

module.exports = { MESSAGES_API }