import { validation } from '../utility/validation.js';

export const authMiddlewares = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    validation('AuthToken not found', '/', req, res);
  } else {
    next();
  }
};
