import session from 'express-session';

export const validation = (msg, redirect, req, res) => {
  req.session.message = msg;
  res.redirect(redirect);
};
