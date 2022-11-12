import { validation } from '../utility/validation.js';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

export const loginUserRedicet = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      const tokenCheck = jwt.verify(token, process.env.JWT_SECRECT);
      if (tokenCheck) {
        const validData = await userModel.findById({
          _id: tokenCheck.id,
        });
        if (validData) {
          next();
        } else {
          res.clearCookie('authToken');
          delete req.session.user;
          validation('Registration Please!', '/login', req, res);
        }
      }
    } else {
      delete req.session.user;
      res.clearCookie('authToken');
      validation('Please login !', '/login', req, res);
    }
  } catch (error) {
    res.clearCookie('authToken');
    validation('Invalid token', '/login', req, res);
  }
};
