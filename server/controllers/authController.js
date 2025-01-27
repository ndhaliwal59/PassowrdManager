const User = require('../models/User');
const Password = require('../models/passwordSchema');
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json('test is working')
}


//register endpoint
const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    
    // Check email
    const emailExists = await User.findOne({email})
    if (emailExists){
      return res.status(400).json({
        error: 'Email already exists'
      })
    }

    // Check username
    const usernameExists = await User.findOne({username})
    if (usernameExists){
      return res.status(400).json({
        error: 'Username already exists'
      })
    }

    const hashedPassword = await hashPassword(password)
    // Creates user
    const user = new User({
      username, 
      email, 
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      error: 'An error occurred during registration'
    })
  }
}


//login endpoint

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, error: 'User not found' });
    }

    // Check if password matches
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ success: false, error: 'Invalid password' });
    }

    // Successful login
    // Generate JWT and send as cookie
    const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set cookie with options
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.json({ success: true, message: 'Login successful', user });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getProfile = (req, res) => {
  const {token} = req.cookies
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>{
      if (err) throw err;
      res.json(user)
    })
  }
  else{
    res.json(null)
  }
}

const addPassword = async (req, res) => {
  try {
    const { website, username, password } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
      }

      const newPassword = new Password({
        userId: userInfo.id,
        website,
        username,
        password, // In a real application, encrypt this before saving
      });

      const savedPassword = await newPassword.save();
      res.json({ success: true, password: savedPassword });
    });
  } catch (error) {
    console.error('Add password error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getPasswords = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
      }

      const passwords = await Password.find({ userId: userInfo.id });
      res.json({ success: true, passwords });
    });
  } catch (error) {
    console.error('Get passwords error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id, website, username, password } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
      }

      const updatedPassword = await Password.findOneAndUpdate(
        { _id: id, userId: userInfo.id },
        { website, username, password },
        { new: true }
      );

      if (!updatedPassword) {
        return res.status(404).json({ success: false, error: 'Password not found or you are not authorized to update it' });
      }

      res.json({ success: true, password: updatedPassword });
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
      }

      const deletedPassword = await Password.findOneAndDelete({ _id: id, userId: userInfo.id });

      if (!deletedPassword) {
        return res.status(404).json({ success: false, error: 'Password not found or you are not authorized to delete it' });
      }

      res.json({ success: true, message: 'Password deleted successfully' });
    });
  } catch (error) {
    console.error('Delete password error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  addPassword,
  logoutUser,
  getPasswords,
  updatePassword,
  deletePassword,
};