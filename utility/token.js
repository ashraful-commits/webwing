import jwt from 'jsonwebtoken';

export const makeToken = (payload, exp = '1d') => {
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: exp,
  });
  return token;
};
