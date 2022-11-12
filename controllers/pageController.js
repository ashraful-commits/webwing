import { render } from 'ejs';
import { userModel } from '../models/userModel.js';
import { makeHash } from '../utility/hash.js';
import { sendAmail } from '../utility/sendMail.js';
import { makeToken } from '../utility/token.js';
import { validation } from '../utility/validation.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
//=============================home page
export const homePage = (req, res) => {
  res.render('index');
};
//==================================aboudt page

export const aboutPage = (req, res) => {
  res.render('about');
};
//======================client page
export const clintPage = (req, res) => {
  res.render('client');
};
//============================contact page
export const contactPage = (req, res) => {
  res.render('contact');
};
//=================================service page
export const servicePage = (req, res) => {
  res.render('service');
};
//=================================== team page
export const teamPage = (req, res) => {
  res.render('team');
};
//=================================== signup page
export const signupPage = (req, res) => {
  res.render('signup');
};
//=================================== login page
export const loginPage = (req, res) => {
  res.render('login');
};

//////////////////////////////////////////////////////////////////
//////////// register form post start ///////////////////////////
////////////////////////////////////////////////////////////////
//==============================================================

export const reginstrationFormSubmit = async (req, res) => {
  try {
    const {
      name,
      email,
      cell,
      gender,
      location,
      password,
      username,
    } = req.body;
    if (
      !name ||
      !email ||
      !cell ||
      !gender ||
      !location ||
      !password ||
      !username
    ) {
      validation('All fields are required', '/signup', req, res);
    } else {
      const isEmail = await userModel
        .findOne()
        .where('email')
        .equals(email);
      if (isEmail) {
        validation('Email already Exist', '/signup', req, res);
      } else {
        const user = await userModel.create({
          name,
          email,
          cell,
          gender,
          password: await makeHash(password),
          username,
          location,
          isActive: false,
        });
        //=========================================create token
        const token = makeToken({ id: user._id }, '3d');
        //==============================================================create link
        const link = `${process.env.APP_LINK}:${process.env.PORT}/active/${token}`;
        //==================================================================send a mail
        await sendAmail(email, {
          name: name,
          cell: cell,
          link: link,
        });
        validation('Sign Up successfull', '/login', req, res);
      }
    }
  } catch (error) {
    validation(error.message, '/signup', req, res);
  }
};
//=========================================================== login form submint
export const loginFormSubmit = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      validation('All fields are required', '/login', req, res);
    } else {
      const checkUser = await userModel
        .findOne()
        .where('email')
        .equals(email);
      if (!checkUser) {
        validation('Registration Please !', '/login', req, res);
      } else {
        if (checkUser.isActive) {
          const checkPass = bcrypt.compareSync(
            password,
            checkUser.password
          );
          console.log(checkPass);
          if (!checkPass) {
            validation('Wrong password!', '/login', req, res);
          } else {
            const token = makeToken({ id: checkUser._id }, '3d');
            req.session.user = checkUser;
            res.cookie('authToken', token);
            validation('', '/', req, res);
          }
        } else {
          validation(
            'please check Email and Active account',
            '/login',
            req,
            res
          );
        }
      }
    }
  } catch (error) {
    validation(error.message, '/login', req, res);
  }
};
export const logoutAction = (req, res) => {
  delete req.session.user;
  res.clearCookie('authToken');
  validation('Logout Succesfully', '/login', req, res);
};

export const ActiveAccount = async (req, res) => {
  const { token } = req.params;
  const tokenVerify = Jwt.verify(token, process.env.JWT_SECRECT);
  console.log(tokenVerify);
  if (!token) {
    validation('Not user', '/login', req, res);
  } else {
    const validUser = await userModel.findByIdAndUpdate(
      { _id: tokenVerify.id },
      {
        isActive: true,
      }
    );
    validation('Account Activeted Login Now!', '/login', req, res);
  }
};
