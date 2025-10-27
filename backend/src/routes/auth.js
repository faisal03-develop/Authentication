const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// --- START OF FIX ---
router.post(
  '/register',
  [
    // 1. Change validation from 'name' to 'username'
    body('username')
      .notEmpty()
      .withMessage('Username is required'),

    // 2. Remove 'email' validation, since your form doesn't send it

    // 3. Keep password validation (this was already correct)
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password min length is 6'),
  ],
  authController.register
);
// --- END OF FIX ---

router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  authController.login
);

module.exports = router;