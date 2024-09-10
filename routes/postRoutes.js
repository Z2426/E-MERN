const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
//Route Post
router.get('/:idPost', postController.getPost)
router.post('/', postController.createPost)
router.delete('/:idPost', postController.deletePost)
router.put('/:idPost', postController.updatePost)
module.exports = router;