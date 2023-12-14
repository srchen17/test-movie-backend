import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import ReviewRoutes from './reviews/routes.js';

import "dotenv/config"; 


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/movie';
mongoose.connect(CONNECTION_STRING);

import session from 'express-session';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

  if (process.env.NODE_ENV !== "development") {
    console.log("node env is not dev")
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ReviewRoutes(app);
app.listen(process.env.PORT || 4000);