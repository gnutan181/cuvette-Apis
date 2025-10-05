const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');


// Public routes
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);


// Protected routes
router.post('/', authMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);


module.exports = router;