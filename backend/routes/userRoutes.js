const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getMe);

module.exports = router;