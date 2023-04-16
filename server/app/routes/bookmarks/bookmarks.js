// dependencies
import express from 'express';
import { getBookmarks, addBookmark, deleteBookmark } from '../../db/bookmarks_db.js';
import { validate } from '../validate_ressource.js';
import { bookmarkSchema, getBookmarksSchema, deleteBookmarkSchema } from './validator_schemas.js';

// express' stuff
const BOOKMARKS_API = express.Router();

BOOKMARKS_API
  .use(express.json())

  // get all bookmarks
  .get('/:user_id',validate(getBookmarksSchema), async (req, res) => {
    let result = await getBookmarks(req.params.user_id, req.query.limit);

    if (!result) res.status(204).json({message: 'No bookmarks was found for specified user'});
    else res.status(202).json(result);
  })

  // post a message to bookmarks
  .post('/:user_id/', validate(bookmarkSchema), async (req, res) => {
    let result = await addBookmark(req.params.user_id, req.body.message_id, req.body.creation_date);

    if (!result) res.status(204).json({message: 'Unable to add new bookmark for specified user'});
    else res.status(201).json({message: 'New bookmark was added successfully'});
  })

  // delete a message from bookmarks
  .delete('/:user_id/:bookmark_id',validate(deleteBookmarkSchema), async (req, res) => {
    let result = await deleteBookmark(req.params.user_id, req.params.bookmark_id);

    if (!result) res.status(204).json({message : 'Unable to delete bookmark'});
    else res.status(202).json({message: 'Bookmark was deleted successfully'});
  })

export { BOOKMARKS_API };