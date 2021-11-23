const jwt = require('jsonwebtoken');

/**
 * This function retrieves jwt token from header,
 * then responds with a 401 if no token is present
 * or the provided token is invalid. 200 response
 * with user associated with the valid token.
 */
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded.user;
    next();

  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};