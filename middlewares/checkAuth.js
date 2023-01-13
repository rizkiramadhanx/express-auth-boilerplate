const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

/*
    This is protection middleware. It will check if user 
    is authenticated.
*/
dotenv.config();

exports.checkAuth = async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie) {
    return res.status(401).json({
      msg: 'No cookie was found',
      success: false,
    });
  }
  const token = cookie.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'You are not authorized to do that.',
    });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUser.id);

    // cek console
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        msg: 'No user found with this ID',
        success: false,
      });
    }
    req.user = user;

    res.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: 'You are not authorized to access this resource',
    });
  }
};
