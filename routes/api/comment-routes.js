const router = require('express').Router();
const {addComment, removeComment} = require('../../controllers/comment-controller');

// /api/comment/<pizzaId> to add a comment to a pizza
router.route('/:pizzaId').post(addComment);

// /api/comments<pizzaId>/<commentId> to remove a comment from a pizza
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;