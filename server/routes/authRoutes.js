const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, addPassword, logoutUser, getPasswords, updatePassword, deletePassword} = require('../controllers/authController'); 

//middleware
router.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173', 
      'https://passowrd-manager.vercel.app'
    ]
  })
);

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', getProfile)
router.post('/add-password', addPassword)
router.get('/get-passwords', getPasswords)
router.put('/update-password', updatePassword)
router.delete('/delete-password/:id', deletePassword);

module.exports = router