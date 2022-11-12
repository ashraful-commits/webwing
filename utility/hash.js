import bcrypt from 'bcryptjs';

export const makeHash = (password) => {
  const genSalt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hash(password, genSalt);
  return hash;
};
