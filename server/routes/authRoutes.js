const express = require('express');
const router = express.Router();
const { 
  test, 
  registerUser, 
  loginUser, 
  getProfile, 
  addPassword, 
  logoutUser, 
  getPasswords, 
  updatePassword, 
  deletePassword 
} = require('../controllers/authController');

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', getProfile);
router.post('/add-password', addPassword);
router.get('/get-passwords', getPasswords);
router.put('/update-password', updatePassword);
router.delete('/delete-password/:id', deletePassword);

module.exports = router;