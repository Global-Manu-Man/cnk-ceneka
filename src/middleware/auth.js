const { admin } = require('../config/firebase');
const { ApiError } = require('../utils/ApiError');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    

    req.user = decodedToken;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = { authenticate };