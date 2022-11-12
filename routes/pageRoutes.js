import express from 'express';
import {
  aboutPage,
  clintPage,
  contactPage,
  homePage,
  servicePage,
  teamPage,
  signupPage,
  loginPage,
  reginstrationFormSubmit,
  loginFormSubmit,
  logoutAction,
  ActiveAccount,
} from '../controllers/pageController.js';
import { authMiddlewares } from '../middlewares/authredirect.js';
import { loginUserRedicet } from '../middlewares/pageRedirect.js';
//=====================================crate router
export const router = express.Router();

//====================================use router
router.get('/', loginUserRedicet, homePage);
router.get('/about', loginUserRedicet, aboutPage);
router.get('/client', loginUserRedicet, clintPage);
router.get('/contact', loginUserRedicet, contactPage);
router.get('/service', loginUserRedicet, servicePage);
router.get('/team', loginUserRedicet, teamPage);
router.get('/signup', authMiddlewares, signupPage);
router.post('/signup', reginstrationFormSubmit);
router.get('/login', authMiddlewares, loginPage);
router.post('/login', loginFormSubmit);
router.get('/logout', logoutAction);
router.get('/active/:token', ActiveAccount);
