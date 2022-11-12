import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import expressLyouts from 'express-ejs-layouts';
import session from 'express-session';
import { router } from './routes/pageRoutes.js';
import { mongodbConncetion } from './config/mongodbconfig.js';
import { sessionMid } from './middlewares/seesionMiddlewaes.js';
import cookieParser from 'cookie-parser';

// /======================================> config
dotenv.config();
//=========================================> crate env variable
const port = process.env.PORT || 4000;
//=======================================> crate express app
const app = express();
//======================================== use sessinon

//========================================> use of app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'nothing',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(sessionMid);
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(expressLyouts);
app.set('layout', 'layouts/app');
//===================================== use rouer here
app.use(router);
//======================================= public folder static
app.use(express.static('public'));
//=========================================> create server
app.listen(port, () => {
  mongodbConncetion();
  console.log(`Server is Running on Port ${port}`.bgMagenta.white);
});
