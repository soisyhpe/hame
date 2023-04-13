// dependencies
const express = require('express');
const messages = require('../../db/messagesDB.js');


// express' stuff
const MESSAGES_API = express.Router();

MESSAGES_API
  .use(express.json())

  // get all messages
  .get('/', (req, res) => {
    messages.getAllMessages()
      .then((result) => {
        console.log("ANHjEK");
        if (result.length===0) res.status(400).json({message: "No messages was found"});
        else res.status(200).json(result);
      }).catch((err) => {
        res.status(500).json({message: "Server error"});
      });
  })

  // get all messages from user id
  .get('/userId/:userId', (req, res) => {
    messages.getMessagesFromUser(req.params.userId)
      .then((result) => {
        console.log("AHJA");
        if (result.length===0) res.status(400).json({message: "No messages was found"});
        else res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({message: "Server error"});
      }
    );

  })

  // get a specific message from its id
  .get('/messageId/:messageId', (req, res) => {
    messages.getMessageById(req.params.messageId)
      .then((result) => {
        console.log("AHUAI");
        if (result) res.status(200).json(result);
        else res.status(400).json({message: "Message was not found"});
      });

  })

  // post a new message
  .post('/', (req, res) => {
    messages.sendPublicMessage(req.body.username, req.body.message)
      .then((result) => {
        if (result) res.status(200).json({message: "Message was sent successfully", messageid : result});
        else res.status(400).json({message: "Message was not sent"});
      });
  })

  // delete a message by its id
  .delete('/:messageId', (req, res) => {
    messages.deleteMessageById(req.params.messageId)
      .then((result) => {
        console.log(result);
        if (result) res.status(200).json({message: "Message was deleted successfully"});
        else res.status(400).json({message: "Message was not found"});
      });
  })

  // put a message (modify a message)
  .put('/:messageId', (req, res) => {
    messages.modifyMessage(req.params.messageId, req.body.message)
      .then((result) => {
        if (result) res.status(200).json({message: "Message was updated successfully"});
        else res.status(400).json({message: "Message was not found"});
      });
  })

module.exports = { MESSAGES_API }