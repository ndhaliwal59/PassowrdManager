const User = require('../models/User');
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
  res.json('test is working')
}


//register endpoint
const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    //check email
    const exist = await User.findOne({email})
    if (exist){
      return res.json({
        error: 'Email already exists'
      })
    }

    const hashedPassowrd = await hashPassword(password)
    //creates user
    const user = new User({
      username, 
      email, 
      password: hashedPassowrd,
    });
    await user.save();

    return res.json(user)
  } catch (error) {
    console.log(error)
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

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,

}